import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterContentInit,
  Input,
  forwardRef,
  ComponentRef,
  EventEmitter,
  Output,
} from '@angular/core';
import Quill from 'quill';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CampaignService } from '../campaign.service';
import { Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import Popper from 'popper.js';
import { LoginService } from '../login.service';
import { environment } from 'src/environments/environment';
import { SearchService, SearchObjectType } from '../search.service';
import { DynComponentService } from '../dyn-component.service';
import { UserViewMiniComponent } from '../account/user-view-mini/user-view-mini.component';
import { Chance } from 'chance';

@Component({
  selector: 'dd-quill',
  templateUrl: './quill.component.html',
  styleUrls: ['./quill.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuillComponent),
      multi: true,
    },
  ],
})
export class QuillComponent
  implements OnInit, AfterContentInit, ControlValueAccessor {
  @Input()
  public readOnly: boolean;

  @Input()
  public simple: boolean;

  @Input()
  public placeholder: string;

  @Input()
  public set value(value: any) {
    this.writeValue(value);
  }

  @Input()
  public cursorUpdates: EventEmitter<ICursorUpdate>;

  @Input()
  public deltaUpdates: EventEmitter<any>;

  @Output()
  public textChange = new EventEmitter<any>();

  @Output()
  public selectionChange = new EventEmitter<any>();

  @ViewChild('container')
  private _container: ElementRef<HTMLDivElement>;

  private _quill: Quill;

  private _onChange: any;
  private _onTouched: any;
  private _cursors: any;
  private _cursorCollection: { [key: string]: any } = {};
  private _selectionUpdateInterval;

  private _writeQueue: any[] = [];

  constructor(
    private campaignService: CampaignService,
    private articleService: ArticleService,
    private login: LoginService,
    private router: Router,
    private http: HttpClient,
    private searchService: SearchService,
    private componentService: DynComponentService
  ) {}

  ngOnInit() {}

  ngAfterContentInit() {
    this._quill = new Quill(
      this._container.nativeElement,
      this.getQuillSettings()
    );

    if (this.readOnly) {
      this._container.nativeElement
        .querySelectorAll('.ql-editor')
        .forEach((n) => {
          n.classList.add('p-0');
        });
    } else {
      this._cursors = this._quill.getModule('cursors');
    }

    this._quill.on('text-change', (delta, oldDelta, source) => {
      if ((source === 'user' || source === 'api') && this._onChange) {
        this._onChange(this._quill.getContents());
        this.textChange.emit(delta);
      }
    });

    this._quill.on('selection-change', (range, oldRange, source) => {
      if ((source === 'user' || source === 'api') && this._onTouched) {
        this._onTouched();
        this.selectionChange.emit(range);
      }
    });

    while (this._writeQueue.length > 0) {
      this.writeValue(this._writeQueue.pop());
    }

    if (this.cursorUpdates) {
      this.cursorUpdates.subscribe((cu) => {
        if (!this._cursorCollection[cu.id] && cu.range) {
          const chance = new Chance(cu.id);

          this._cursorCollection[cu.id] = this._cursors.createCursor(
            cu.id,
            cu.displayName,
            chance.color({ format: 'hex' })
          );
        }

        if (cu.range) {
          this._cursors.moveCursor(cu.id, cu.range);
        } else if (this._cursorCollection[cu.id]) {
          this._cursors.removeCursor(cu.id);
        }
      });
    }

    if (this.deltaUpdates) {
      this.deltaUpdates.subscribe((du) => {
        if (this._quill) {
          this._quill.updateContents(du.ops, 'colab');
        }
      });
    }

    this._selectionUpdateInterval = setInterval(() => {
      this.selectionChange.emit(this._quill.getSelection());
    }, 1500);
  }

  writeValue(obj: any): void {
    if (!this._quill) {
      this._writeQueue.push(obj);
    } else {
      if (obj !== null && obj !== undefined) {
        this._quill.setContents(obj.ops, 'form');

        if (this.readOnly) {
          this.setupMentions();
        }

        this.setupImages(this._container.nativeElement.querySelectorAll('img'));
        this.setupTables(
          this._container.nativeElement.querySelectorAll('table')
        );
      } else {
        this._quill.setContents([], 'form');
      }
    }
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  private getQuillSettings() {
    const base: any = {
      placeholder: this.placeholder,
      modules: {
        blotFormatter: {},
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block', 'image', 'link'],

          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent

          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ align: [] }],

          ['clean'], // remove formatting button
        ],
        mention: {
          mentionDenotationChars: ['@'],
          allowedChars: /^[A-Za-z0-9\s'_\-"]*$/,
          source: async (search, renderList, mentionChar) => {
            const newSearch = await this.searchService.search(search);

            const mappedResults: any[] = newSearch.map((sr) => {
              switch (sr.type) {
                case SearchObjectType.ARTICLE:
                  return {
                    id: sr.article.id,
                    value: sr.article.name,
                    obj: sr.article,
                    type: sr.type,
                  };
                case SearchObjectType.ENTITY:
                  return {
                    id: sr.entity.id,
                    value: sr.entity.name,
                    obj: sr.entity,
                    type: sr.type,
                  };
                case SearchObjectType.ITEM:
                  return {
                    id: sr.item.id,
                    value: sr.item.name,
                    obj: sr.item,
                    type: sr.type,
                  };
                case SearchObjectType.MAP:
                  return {
                    id: sr.map.id,
                    value: sr.map.name,
                    obj: sr.map,
                    type: sr.type,
                  };
                case SearchObjectType.QUEST:
                  return {
                    id: sr.quest.id,
                    value: sr.quest.name,
                    obj: sr.quest,
                    type: sr.type,
                  };
                case SearchObjectType.SPELL:
                  return {
                    id: sr.spell.id,
                    value: sr.spell.name,
                    obj: sr.spell,
                    type: sr.type,
                  };
                case SearchObjectType.USER:
                  return {
                    id: sr.user.id,
                    value: sr.user.username,
                    obj: sr.user,
                    type: sr.type,
                  };
              }
            });

            if (search.trim().length >= 3 && this.campaignService.canEdit) {
              mappedResults.push({
                id: 'create-empty-article',
                value: search,
                type: 'create-article',
              });
            }

            renderList(mappedResults);
          },

          renderItem: (item, searchTerm) => {
            let html = '<div>';

            function labelHTML(text: string) {
              return `<span class="label">${text}</span>`;
            }

            switch (item.type) {
              case SearchObjectType.ARTICLE:
                html += `<span><i class="icon icon-bookmark"></i> ${
                  item.obj.name
                } ${!item.obj.published ? labelHTML('Hidden') : ''}</span>`;
                break;
              case SearchObjectType.ENTITY:
                html += `<span><i class="icon icon-emoji"></i> ${
                  item.obj.name
                }</span>`;
                break;
              case SearchObjectType.ITEM:
                html += `<span><i class="icon icon-photo"></i> ${
                  item.obj.name
                } ${!item.obj.playerVisible ? labelHTML('Hidden') : ''}</span>`;
                break;
              case SearchObjectType.MAP:
                html += `<span><i class="icon icon-location"></i> ${
                  item.obj.name
                } ${!item.obj.playerVisible ? labelHTML('Hidden') : ''}</span>`;
                break;
              case SearchObjectType.QUEST:
                html += `<span><i class="icon icon-flag"></i> ${
                  item.obj.name
                } ${!item.obj.visible ? ' ' + labelHTML('Hidden') : ''}${
                  !item.obj.visible ? ' ' + labelHTML('Unavailable') : ''
                }</span>`;
                break;
              case SearchObjectType.SPELL:
                html += `<span><i class="icon icon-time"></i> ${
                  item.obj.name
                } ${!item.obj.playerVisible ? labelHTML('Hidden') : ''}</span>`;
                break;
              case SearchObjectType.USER:
                html += `<span><i class="icon icon-people"></i> ${
                  item.obj.username
                }</span>`;
                break;
              case 'create-article':
                html += `<span><i class="icon icon-plus"></i> ${
                  item.value
                }</span>`;
                break;
            }

            html += '</div>';
            return html;
          },

          onSelect: async (item, insertItem) => {
            switch (item.type) {
              case SearchObjectType.ARTICLE:
                item.value = item.value.name;
                break;
              case SearchObjectType.ENTITY:
                item.value = item.value.name;
                break;
              case SearchObjectType.ITEM:
                item.value = item.value.name;
                break;
              case SearchObjectType.MAP:
                item.value = item.value.name;
                break;
              case SearchObjectType.QUEST:
                item.value = item.value.name;
                break;
              case SearchObjectType.SPELL:
                item.value = item.value.name;
                break;
              case SearchObjectType.USER:
                item.value = item.value.username;
                break;
              case 'create-article':
                if (
                  (await Swal.fire({
                    title: 'Create new article?',
                    text: `A new article with the name ${
                      item['value']
                    } will be created`,
                    showCancelButton: true,
                  })).value === true
                ) {
                  const newArticle = await this.articleService.createArticle({
                    name: item['value'].trim(),
                    published: false,
                    campaignId: this.campaignService.campaign.id,
                    userId: this.login.id,
                    tags: ['ToDo'],
                    content: {},
                  });

                  item['id'] = newArticle.id;
                  item['type'] = SearchObjectType.ARTICLE;

                  insertItem(item);
                }
                return;
            }

            insertItem(item);
          },

          showDenotationChar: false,

          listItemClass: 'menu-item',
          mentionListClass: 'menu',
          dataAttributes: ['id', 'value', 'type'],
        },
      },
      readOnly: this.readOnly,
    };

    if (this.readOnly) {
      base.modules.toolbar = false;
      base.modules.theme = undefined;
      base.modules.mention = false;
    } else {
      base.theme = 'snow';
      base.modules.cursors = true;

      if (this.simple) {
        base.modules.toolbar = [
          [
            'bold',
            'italic',
            'underline',
            'strike',
            { list: 'ordered' },
            { list: 'bullet' },
            'blockquote',
          ],
        ];
      } else {
        base.modules.imageUploader = {
          upload: async (file) => {
            const form = new FormData();
            form.append('file', file);
            form.append('campaignId', this.campaignService.campaign.id);

            const result = await this.http
              .post(`${environment.apiURL}/upload`, form)
              .toPromise();

            return result['secure_url'];
          },
        };
      }
    }
    return base;
  }

  private setupMentions() {
    const getIconEl = (icon: string) => {
      const el = document.createElement('i');
      el.classList.add('icon');
      el.classList.add(icon);
      return el;
    };

    this._container.nativeElement
      .querySelectorAll(`[data-type="${SearchObjectType.ARTICLE}"]`)
      .forEach((node: HTMLSpanElement) => {
        const id = node.dataset.id;

        node.prepend(getIconEl('icon-bookmark'));

        node.addEventListener('click', () => {
          this.router.navigate([
            'campaigns',
            this.campaignService.campaign.id,
            'articles',
            id,
          ]);
        });
      });

    this._container.nativeElement
      .querySelectorAll(`[data-type="${SearchObjectType.ENTITY}"]`)
      .forEach((node: HTMLSpanElement) => {
        const id = node.dataset.id;

        node.prepend(getIconEl('icon-emoji'));

        node.addEventListener('click', () => {
          this.router.navigate([
            'campaigns',
            this.campaignService.campaign.id,
            'entities',
            id,
          ]);
        });
      });

    this._container.nativeElement
      .querySelectorAll(`[data-type="${SearchObjectType.ITEM}"]`)
      .forEach((node: HTMLSpanElement) => {
        const id = node.dataset.id;

        node.prepend(getIconEl('icon-photo'));

        node.addEventListener('click', () => {
          this.router.navigate([
            'campaigns',
            this.campaignService.campaign.id,
            'items',
            id,
          ]);
        });
      });

    this._container.nativeElement
      .querySelectorAll(`[data-type="${SearchObjectType.MAP}"]`)
      .forEach((node: HTMLSpanElement) => {
        const id = node.dataset.id;

        node.prepend(getIconEl('icon-location'));

        node.addEventListener('click', () => {
          this.router.navigate([
            'campaigns',
            this.campaignService.campaign.id,
            'maps',
            id,
          ]);
        });
      });

    this._container.nativeElement
      .querySelectorAll(`[data-type="${SearchObjectType.QUEST}"]`)
      .forEach((node: HTMLSpanElement) => {
        const id = node.dataset.id;

        node.prepend(getIconEl('icon-flag'));

        node.addEventListener('click', () => {
          this.router.navigate([
            'campaigns',
            this.campaignService.campaign.id,
            'quests',
            id,
          ]);
        });
      });

    this._container.nativeElement
      .querySelectorAll(`[data-type="${SearchObjectType.SPELL}"]`)
      .forEach((node: HTMLSpanElement) => {
        const id = node.dataset.id;

        node.prepend(getIconEl('icon-time'));

        node.addEventListener('click', () => {
          this.router.navigate([
            'campaigns',
            this.campaignService.campaign.id,
            'spells',
            id,
          ]);
        });
      });

    this._container.nativeElement
      .querySelectorAll(`[data-type="${SearchObjectType.USER}"]`)
      .forEach((node: HTMLSpanElement) => {
        const id = node.dataset.id;
        let popper;
        let popperEl: HTMLDivElement;
        let component: ComponentRef<any>;

        node.prepend(getIconEl('icon-people'));

        node.addEventListener('mouseenter', () => {
          popperEl = document.createElement('div');
          popperEl.classList.add('card');
          popperEl.classList.add('p-2');
          document.body.appendChild(popperEl);

          component = this.componentService.getComponent(UserViewMiniComponent);
          component.instance.userId = id;

          popperEl.appendChild(this.componentService.getRootNode(component));

          popper = new Popper(node, popperEl, {
            placement: 'top',
          });
          (component.instance as UserViewMiniComponent).valueUpdate.subscribe(
            () => {
              popper.scheduleUpdate();
            }
          );
        });

        node.addEventListener('mouseleave', () => {
          component.destroy();
          popper.destroy();
          document.body.removeChild(popperEl);
        });
      });
  }

  private setupTables(nodes: NodeListOf<HTMLTableElement>) {
    nodes.forEach((n) => n.classList.add('table', 'table-striped'));
  }

  private setupImages(nodes: NodeListOf<HTMLImageElement>) {
    nodes.forEach((n) => {
      n.classList.add('img-responsive');
    });
  }
}

export interface ICursorUpdate {
  id: string;
  noteId?: string;
  displayName: string;
  range: { index: number; length: number };
}
