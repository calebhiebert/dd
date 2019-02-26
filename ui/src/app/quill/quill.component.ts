import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterContentInit,
  Input,
  forwardRef,
} from '@angular/core';
import Quill from 'quill';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CampaignService } from '../campaign.service';
import { Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { LoginService } from '../login.service';
import { environment } from 'src/environments/environment';

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

  @ViewChild('container')
  private _container: ElementRef<HTMLDivElement>;

  private _quill: Quill;

  private _onChange: any;
  private _onTouched: any;

  private _writeQueue: any[] = [];

  constructor(
    private campaignService: CampaignService,
    private articleService: ArticleService,
    private login: LoginService,
    private router: Router,
    private http: HttpClient
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
    }

    this._quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user' && this._onChange) {
        this._onChange(this._quill.getContents());
      }
    });

    this._quill.on('selection-change', (range, oldRange, source) => {
      if (source === 'user' && this._onTouched) {
        this._onTouched();
      }
    });

    while (this._writeQueue.length > 0) {
      this.writeValue(this._writeQueue.pop());
    }
  }

  writeValue(obj: any): void {
    if (!this._quill) {
      this._writeQueue.push(obj);
    } else {
      if (obj !== null && obj !== undefined) {
        this._quill.setContents(obj.ops);

        this.setupArticleMentions(
          this._container.nativeElement.querySelectorAll(
            '[data-type="article"]'
          )
        );

        this.setupImages(this._container.nativeElement.querySelectorAll('img'));
        this.setupTables(
          this._container.nativeElement.querySelectorAll('table')
        );
      } else {
        this._quill.setContents([]);
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
          ['blockquote', 'code-block', 'image'],

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
            const articles = await this.articleService.getArticles(
              this.campaignService.campaign.id,
              5,
              0,
              search
            );

            const mappedArticles = articles.map((a) => ({
              id: a.id,
              value: a.name,
              published: a.published,
            }));

            if (search.trim().length > 0) {
              mappedArticles.push({
                id: 'create-empty-article',
                value: search,
                published: false,
              });
            }

            renderList(mappedArticles);
          },

          renderItem: (item, searchTerm) => {
            return `<div><span>${
              item.id === 'create-empty-article'
                ? '<i class="icon icon-plus"></i> '
                : ''
            }${item.value}</span>${
              !item.published
                ? '<span class="label ml-1 label-rounded">Hidden</span>'
                : ''
            }</div>`;
          },

          onSelect: async (item, insertItem) => {
            item['type'] = 'article';

            if (
              item['id'] === 'create-empty-article' &&
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
              item['type'] = 'article';
              item['name'] = newArticle.name;

              insertItem(item);
            } else {
              insertItem(item);
            }
          },

          showDenotationChar: false,

          listItemClass: 'menu-item',
          mentionListClass: 'menu',
        },
      },
      readOnly: this.readOnly,
    };

    if (this.readOnly) {
      base.modules.toolbar = false;
      base.modules.theme = undefined;
    } else {
      base.theme = 'snow';

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

  private setupArticleMentions(nodes: NodeListOf<HTMLSpanElement>) {
    nodes.forEach((node) => {
      const id = node.dataset.id;

      node.addEventListener('click', () => {
        this.router.navigate([
          'campaigns',
          this.campaignService.campaign.id,
          'articles',
          id,
        ]);
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
