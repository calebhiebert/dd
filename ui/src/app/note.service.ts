import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUser } from './user.service';
import { LoginService } from './login.service';
import { IMapShape } from './map.service';
import { NoteEditorComponent } from './notes/note-editor/note-editor.component';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private _noteEditor: NoteEditorComponent;
  private _noteCache: INote[];

  private _noteUpdate = new EventEmitter<INote>();
  private _noteCreate = new EventEmitter<INote>();
  private _noteDelete = new EventEmitter<INote>();

  constructor(private http: HttpClient, private login: LoginService) {
    this.clearNoteCache();
  }

  public setNoteEditor(editor: NoteEditorComponent) {
    this._noteEditor = editor;
  }

  public addNote(opts: INoteOptions) {
    this._noteEditor.addNote(opts);
  }

  public editNote(note: INote) {
    this._noteEditor.editNote(note);
  }

  public clearNoteCache() {
    if (this._noteCache) {
      for (const note of this._noteCache) {
        this._noteDelete.emit(note);
      }
    }

    this._noteCache = [];
  }

  public getQuestNotes(questId: string) {
    return this._noteCache.filter((n) => n.questId === questId);
  }

  public getMapNotes(mapId: string) {
    return this._noteCache.filter((n) => n.mapId === mapId);
  }

  public getArticleNotes(articleId: string) {
    return this._noteCache.filter((n) => n.articleId === articleId);
  }

  public getNotes(campaignId: string, query: INoteQuery): Promise<INote[]> {
    let queryString = `?campaignId=${campaignId}`;

    if (query.questId) {
      queryString += `&questId=${query.questId}`;
    }

    if (query.mapId) {
      queryString += `&mapId=${query.mapId}`;
    }

    if (query.articleId) {
      queryString += `&articleId=${query.articleId}`;
    }

    return this.http
      .get<INote[]>(`${environment.apiURL}/notes${queryString}`)
      .toPromise()
      .then((notes) => {
        this.addOrUpdateCacheNotes(notes);
        return notes;
      });
  }

  public getNote(id: string): Promise<INote> {
    return this.http
      .get<INote>(`${environment.apiURL}/notes/${id}`)
      .toPromise()
      .then((note) => {
        this.addOrUpdateCacheNotes([note]);
        return note;
      });
  }

  public createNote(note: INote): Promise<INote> {
    return this.http
      .post<INote>(`${environment.apiURL}/notes`, note)
      .toPromise()
      .then((createdNote) => {
        this.addOrUpdateCacheNotes([createdNote]);
        return createdNote;
      });
  }

  public updateNote(note: INote): Promise<void> {
    return this.http
      .put<void>(`${environment.apiURL}/notes/${note.id}`, note)
      .toPromise()
      .then(() => {
        this.addOrUpdateCacheNotes([note]);
      });
  }

  public deleteNote(id: string): Promise<void> {
    return this.http
      .delete<void>(`${environment.apiURL}/notes/${id}`)
      .toPromise()
      .then(() => {
        this.removeNoteFromCache(id);
      });
  }

  public addOrUpdateCacheNotes(notes: INote[]) {
    for (const n of notes) {
      const existingNote = this._noteCache.find((cn) => cn.id === n.id);

      if (existingNote !== undefined) {
        if (n.userId !== this.login.id && n.publicView === false) {
          this.removeNoteFromCache(n.id);
        } else {
          Object.assign(existingNote, n);
          this._noteUpdate.emit(existingNote);
        }
      } else {
        this._noteCache.push({ ...n });
        this._noteCreate.emit(n);
      }
    }
  }

  public removeNoteFromCache(noteId: string) {
    this._noteCache = this._noteCache.filter((n) => {
      if (n.id === noteId) {
        this._noteDelete.emit(n);
        return false;
      } else {
        return true;
      }
    });
  }

  public get noteDelete() {
    return this._noteDelete;
  }

  public get noteCreate() {
    return this._noteCreate;
  }

  public get noteUpdate() {
    return this._noteUpdate;
  }
}

export interface INoteOptions {
  type: NoteType;

  // Quest
  questId?: string;

  // Map
  mapId?: string;
  lat?: number;
  lng?: number;
  mapShape?: IMapShape;

  // Article
  articleId?: string;
}

export enum NoteType {
  QUEST,
  MAP,
  ARTICLE,
}

export interface INote {
  id?: string;
  title: string;
  content: any;
  campaignId: string;
  questId?: string;
  articleId?: string;
  publicEdit: boolean;
  publicView: boolean;
  userId?: string;
  user?: IUser;
  createdAt?: Date;
  updatedAt?: Date;
  mapId?: string;
  lat?: number;
  lng?: number;
  mapShape?: IMapShape;
}

export interface INoteQuery {
  questId?: string;
  mapId?: string;
  articleId?: string;
}
