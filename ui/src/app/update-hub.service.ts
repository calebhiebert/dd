import { Injectable, EventEmitter } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { LoginService, LoginStatus } from './login.service';
import { ICampaign } from './campaign.service';
import { NotificationService } from './notification.service';
import { IEntity, EntityService } from './entity.service';
import { NoteService } from './note.service';
import { ToastrService } from 'ngx-toastr';
import { IArticle, IArticleConcept } from './article.service';
import { IConceptEntity } from './concept.service';
import { ICursorUpdate } from './custom-controls/quill/quill.component';

export enum ConnectionState {
  NOT_CONNECTED,
  CONNECTED,
  CLOSED,
  CONNECTING,
  AUTHENTICATING,
}

@Injectable({
  providedIn: 'root',
})
export class UpdateHubService {
  private _state: ConnectionState;

  private connection: HubConnection;

  private _isCampaignSubscribed = false;

  // Events
  public entityUpdated = new EventEmitter<IEntity>();
  public entityCreated = new EventEmitter<IEntity>();
  public entityDeleted = new EventEmitter<string>();
  public campaignUpdated = new EventEmitter<ICampaign>();
  public campaignRefresh = new EventEmitter<boolean>();
  public articleCreated = new EventEmitter<IArticle>();
  public articleUpdated = new EventEmitter<IArticle>();
  public articleDeleted = new EventEmitter<IArticle>();
  public cursorUpdate = new EventEmitter<ICursorUpdate>();
  public noteDeltaUpdate = new EventEmitter<{ id: string; delta: any }>();
  public stateUpdate = new EventEmitter<ConnectionState>();
  public conceptEntityUpdate = new EventEmitter<IConceptEntity>();
  public conceptEntityDelete = new EventEmitter<IConceptEntity>();
  public conceptArticleUpdate = new EventEmitter<IArticleConcept>();
  public conceptArticleDelete = new EventEmitter<IArticleConcept>();
  public notificationUpdate = new EventEmitter<boolean>();

  constructor(private login: LoginService, private noteService: NoteService, private toastr: ToastrService) {
    this._state = ConnectionState.NOT_CONNECTED;
    this.stateUpdate.emit(this._state);

    this.login.loginStatus.subscribe((loginStatus) => {
      if (loginStatus === LoginStatus.LOGGED_IN) {
        this.start();
      } else if (loginStatus === LoginStatus.NOT_LOGGED_IN) {
        this.stop();
      }
    });

    if (this.login.isLoggedIn) {
      this.start();
    }
  }

  private async setup() {
    this.connection.onclose((e) => {
      this._state = ConnectionState.CLOSED;
      this.stateUpdate.emit(this._state);
      this.start();
    });

    this.connection.on('AuthenticateComplete', () => this.authComplete());

    this.connection.on('CampaignUpdate', (campaign: ICampaign) => this.campaignUpdated.emit(campaign));

    this.connection.on('Notify', () => {
      this.notificationUpdate.emit(true);
    });

    this.connection.on('EventNotify', (event) => {
      this.toastr.info(event.message);
    });

    this.connection.on('EntityUpdate', (entity) => {
      this.entityUpdated.emit(entity);
    });

    this.connection.on('EntityCreate', (entity) => {
      this.entityCreated.emit(entity);
    });

    this.connection.on('EntityDelete', (entityId) => {
      this.entityDeleted.emit(entityId);
    });

    this.connection.on('NoteCreate', (note) => {
      this.noteService.addOrUpdateCacheNotes([note]);
    });

    this.connection.on('NoteUpdate', (note) => {
      this.noteService.addOrUpdateCacheNotes([note]);
    });

    this.connection.on('NoteDelete', (note) => {
      this.noteService.removeNoteFromCache(note.id);
    });

    this.connection.on('ArticleCreate', (article) => {
      this.articleCreated.emit(article);
    });

    this.connection.on('ArticleUpdate', (article) => {
      this.articleUpdated.emit(article);
    });

    this.connection.on('ArticleDelete', (article) => {
      this.articleDeleted.emit(article);
    });

    this.connection.on('NoteCursorUpdate', (ncu) => {
      this.cursorUpdate.emit(ncu);
    });

    this.connection.on('NoteDeltaUpdate', (ndu) => {
      this.noteDeltaUpdate.emit(ndu);
    });

    this.connection.on('ConceptEntityUpdate', (ce) => {
      this.conceptEntityUpdate.emit(ce);
    });

    this.connection.on('ConceptEntityDelete', (ce) => {
      this.conceptEntityDelete.emit(ce);
    });

    this.connection.on('RefreshCurrentCampaign', () => {
      this.campaignRefresh.emit(true);
    });

    this.connection.on('ConceptArticleUpdate', (ca) => {
      this.conceptArticleUpdate.emit(ca);
    });

    this.connection.on('ConceptArticleDelete', (ca) => {
      this.conceptArticleDelete.emit(ca);
    });

    await this.authenticate();
  }

  private async authenticate() {
    this._state = ConnectionState.AUTHENTICATING;
    this.stateUpdate.emit(this._state);

    try {
      await this.connection.invoke('Authenticate');
    } catch (err) {
      throw err;
    }
  }

  private async start() {
    if ([ConnectionState.CLOSED, ConnectionState.NOT_CONNECTED].indexOf(this.state) === -1) {
      return;
    }

    this.connection = new HubConnectionBuilder()
      .withUrl(`${environment.hubURL}`, {
        accessTokenFactory: () => this.login.token,
      })
      .build();

    try {
      this._state = ConnectionState.CONNECTING;
      this.stateUpdate.emit(this._state);

      await this.connection.start();
      this._state = ConnectionState.CONNECTED;
      this.stateUpdate.emit(this._state);

      await this.setup();
    } catch (err) {
      this._state = ConnectionState.CLOSED;
      this.stateUpdate.emit(this._state);
      console.log('ERROR', err);

      setTimeout(() => {
        this.start();
      }, 5000);
    }
  }

  private async stop() {
    if (this.connection) {
      await this.connection.stop();
      this._state = ConnectionState.NOT_CONNECTED;
      this.stateUpdate.emit(this._state);
    }
  }

  private authComplete() {
    this._state = ConnectionState.CONNECTED;
    this.stateUpdate.emit(this._state);
  }

  public async subscribeCampaign(campaignId: string) {
    if (this.state !== ConnectionState.CONNECTED) {
      console.warn('Not in connected state');
      return;
    }

    try {
      const res = await this.connection.invoke('SubscribeCampaign', campaignId);
      this._isCampaignSubscribed = true;
    } catch (err) {
      throw err;
    }
  }

  public async unsubscribeCampaign(campaignId: string) {
    if (this.state !== ConnectionState.CONNECTED) {
      console.warn('Not in connected state');
      return;
    }

    try {
      const res = await this.connection.invoke('UnsubscribeCampaign', campaignId);
      this._isCampaignSubscribed = false;
    } catch (err) {
      throw err;
    }
  }

  public async subscribeEntities(entityIds: string[]) {
    if (this.state !== ConnectionState.CONNECTED) {
      console.warn('Not in connected state');
      return;
    }

    try {
      const res = await this.connection.invoke('SubscribeEntities', entityIds);
    } catch (err) {
      throw err;
    }
  }

  public async unsubscribeEntities(entityIds: string[]) {
    if (this.state !== ConnectionState.CONNECTED) {
      console.warn('Not in connected state');
      return;
    }

    try {
      const res = await this.connection.invoke('UnsubscribeEntities', entityIds);
    } catch (err) {
      throw err;
    }
  }

  public async subscribeNote(noteId: string) {
    if (this.state !== ConnectionState.CONNECTED) {
      console.warn('Not in connected state');
      return;
    }

    try {
      await this.connection.invoke('SubscribeNote', noteId);
    } catch (err) {
      throw err;
    }
  }

  public async unsubscribeNote(noteId: string) {
    if (this.state !== ConnectionState.CONNECTED) {
      console.warn('Not in connected state');
      return;
    }

    try {
      await this.connection.invoke('UnsubscribeNote', noteId);
    } catch (err) {
      throw err;
    }
  }

  public async sendNoteCursorUpdate(noteId: string, range: { index: number; length: number }) {
    if (this.state !== ConnectionState.CONNECTED) {
      console.warn('Not in connected state');
      return;
    }

    await this.connection.invoke('NoteCursorUpdate', noteId, { range });
  }

  public async sendNoteDeltaUpdate(noteId: string, delta: any) {
    if (this.state !== ConnectionState.CONNECTED) {
      console.warn('Not in connected state');
      return;
    }

    await this.connection.invoke('NoteDeltaUpdate', noteId, delta);
  }

  public async subscribeArticles(articleIds: string[]) {
    if (this.state !== ConnectionState.CONNECTED) {
      console.warn('Not in connected state');
      return;
    }

    await this.connection.invoke('SubscribeArticles', articleIds);
  }

  public async unsubscribeArticles(articleIds: string[]) {
    if (this.state !== ConnectionState.CONNECTED) {
      console.warn('Not in connected state');
      return;
    }

    await this.connection.invoke('UnsubscribeArticles', articleIds);
  }

  public get state() {
    return this._state;
  }
}
