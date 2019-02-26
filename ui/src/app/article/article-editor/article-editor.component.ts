import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { CampaignService } from 'src/app/campaign.service';
import { LoginService } from 'src/app/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticle, ArticleService } from 'src/app/article.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import Quill from 'quill';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ComponentCanDeactivate } from 'src/app/unsaved-changes.guard';

@Component({
  selector: 'dd-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
})
export class ArticleEditorComponent
  implements OnInit, AfterViewInit, ComponentCanDeactivate {
  public formGroup: FormGroup;
  public saving = false;
  public loading = false;

  private _article: IArticle;

  @ViewChild('editor')
  private _editor: ElementRef<HTMLDivElement>;
  private _quill: Quill;
  private _quillDirty = false;

  constructor(
    private campaignSerivce: CampaignService,
    private articleService: ArticleService,
    private login: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(30),
      ]),
      published: new FormControl(false),
      tags: new FormArray([]),
      icon: new FormControl(),
    });

    if (this.editing) {
      this.formGroup.disable();

      this.route.paramMap.subscribe((params) => {
        this.load(params.get('a_id'));
      });
    }
  }

  ngAfterViewInit() {
    this._quill = new Quill(this._editor.nativeElement, {
      theme: 'snow',
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
              this.campaignSerivce.campaign.id,
              5,
              0,
              search
            );

            const mappedArticles = articles.map((a) => ({
              id: a.id,
              value: a.name,
            }));

            if (search.trim().length > 0) {
              mappedArticles.unshift({
                id: 'create-empty-article',
                value: search,
              });
            }

            renderList(mappedArticles);
          },

          renderItem: (item, searchTerm) => {
            return `<span>${
              item.id === 'create-empty-article'
                ? '<i class="icon icon-plus"></i> '
                : ''
            }${item.value}</span>`;
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
                campaignId: this.campaignSerivce.campaign.id,
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
        imageUploader: {
          upload: async (file) => {
            const form = new FormData();
            form.append('file', file);
            form.append('campaignId', this.campaignSerivce.campaign.id);

            const result = await this.http
              .post(`${environment.apiURL}/upload`, form)
              .toPromise();

            return result['secure_url'];
          },
        },
      },
    });

    this._quill.on('text-change', (delta, old, src) => {
      if (src === 'user') {
        this._quillDirty = true;
      }
    });
  }

  canDeactivate() {
    return !this.formGroup.dirty && !this._quillDirty;
  }

  private constructArticle(): IArticle {
    const v = this.formGroup.value;

    const article: IArticle = {
      name: v.name,
      content: this._quill.getContents(),
      published: v.published,
      campaignId: this.campaignSerivce.campaign.id,
      userId: this.login.id,
      tags: v.tags || [],
      icon: v.icon,
    };

    if (this.editing) {
      article.id = this._article.id;
      article.userId = this._article.userId;
      article.map = this._article.map;
      article.lat = this._article.lat;
      article.lng = this._article.lng;
    }

    return article;
  }

  private async load(id: string) {
    this.loading = true;

    try {
      this._article = await this.articleService.getArticle(id);

      if (this._article.content && this._article.content.ops) {
        this._quill.setContents(this._article.content.ops);
      }
    } catch (err) {
      throw err;
    }

    if (this._article.tags === null) {
      this._article.tags = [];
    }

    this.formGroup.patchValue(this._article);

    if (this._article.tags) {
      (this.formGroup.get(
        'tags'
      ) as FormArray).controls = this._article.tags.map(
        (t) => new FormControl(t)
      );
    }

    this.formGroup.enable();
    this.loading = false;
  }

  public async save() {
    this.formGroup.disable();
    this.saving = true;

    try {
      const article = this.constructArticle();

      if (this.editing) {
        await this.articleService.updateArticle(article);
      } else {
        await this.articleService.createArticle(article);
      }
    } catch (err) {
      throw err;
    }

    this.saving = false;
    this.formGroup.enable();
    this.formGroup.markAsPristine();
    this._quillDirty = false;
    this.router.navigate([
      'campaigns',
      this.campaignSerivce.campaign.id,
      'articles',
    ]);
  }

  public async delete() {
    if (
      (await Swal.fire({ title: 'Are you sure?', showCancelButton: true }))
        .value === true
    ) {
      try {
        await this.articleService.deleteArticle(this._article.id);
        this.router.navigate([
          'campaigns',
          this.campaignSerivce.campaign.id,
          'articles',
        ]);
      } catch (err) {
        throw err;
      }
    }
  }

  public cancel() {
    this.location.back();
  }

  public get editing() {
    return this.route.snapshot.data.editing;
  }

  public get name() {
    return this.formGroup.get('name');
  }

  public get icon() {
    return this.formGroup.get('icon');
  }

  public get article() {
    return this._article;
  }
}
