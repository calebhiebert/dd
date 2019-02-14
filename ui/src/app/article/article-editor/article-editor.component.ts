import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CampaignService } from 'src/app/campaign.service';
import { LoginService } from 'src/app/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticle, ArticleService } from 'src/app/article.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import Tribute, { TributeItem } from 'tributejs';

@Component({
  selector: 'dd-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
})
export class ArticleEditorComponent implements OnInit {
  public froalaOptions: any;
  public formGroup: FormGroup;
  public saving = false;
  public loading = false;

  private _article: IArticle;

  constructor(
    private campaignSerivce: CampaignService,
    private articleService: ArticleService,
    private login: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.froalaOptions = this.makeFroalaOptions();

    this.formGroup = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(30),
      ]),
      text: new FormControl(null),
      published: new FormControl(false),
      tags: new FormArray([]),
    });

    if (this.editing) {
      this.formGroup.disable();

      this.route.paramMap.subscribe((params) => {
        this.load(params.get('a_id'));
      });
    }
  }

  private makeFroalaOptions() {
    return {
      fileUpload: false,
      videoUpload: false,
      height: 400,
      imageUploadMethod: 'POST',
      imageUploadURL: `${environment.apiURL}/upload/froala`,
      imageUploadParams: {
        campaignId:
          this.campaignSerivce.campaign && this.campaignSerivce.campaign.id,
      },
      requestHeaders: {
        Authorization: `Bearer ${this.login.loadToken()}`,
      },
      events: {
        'froalaEditor.initialized': (e, editor) => {
          const t = new Tribute({
            allowSpaces: true,

            values: async (text, cb) => {
              const articles = await this.articleService.getArticles(
                this.campaignSerivce.campaign.id,
                10,
                0,
                text
              );

              console.log(articles);

              cb(articles);
            },

            menuItemTemplate: (article: TributeItem<IArticle>) => {
              return article.original.name;
            },

            selectTemplate: (item) => {
              const link = `/campaigns/${
                this.campaignSerivce.campaign.id
              }/articles/${item.original.id}`;

              return `<a [routerLink]="${link}">${item.original.name}</a>`;
            },

            lookup: (article) => {
              return `${article.name} ${article.text} ${article.tags.join(
                ' '
              )}`;
            },

            fillAttr: 'id',
          });

          const el = document.querySelector('.fr-element.fr-view');

          t.attach(el);
        },
      },
      toolbarButtons: [
        'fullscreen',
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        '|',
        'fontFamily',
        'fontSize',
        'color',
        'inlineClass',
        'inlineStyle',
        'paragraphStyle',
        'lineHeight',
        '|',
        'paragraphFormat',
        'align',
        'formatOL',
        'formatUL',
        'outdent',
        'indent',
        'quote',
        '-',
        'insertLink',
        'insertImage',
        'insertVideo',
        'embedly',
        'insertTable',
        '|',
        'emoticons',
        'fontAwesome',
        'specialCharacters',
        'insertHR',
        'selectAll',
        'clearFormatting',
        '|',
        'print',
        'help',
        '|',
        'undo',
        'redo',
      ],
    };
  }

  private constructArticle(): IArticle {
    const v = this.formGroup.value;

    const article: IArticle = {
      name: v.name,
      text: v.text,
      published: v.published,
      campaignId: this.campaignSerivce.campaign.id,
      userId: this.login.id,
      tags: v.tags || [],
    };

    if (this.editing) {
      article.id = this._article.id;
      article.userId = this._article.userId;
    }

    return article;
  }

  private async load(id: string) {
    this.loading = true;

    try {
      this._article = await this.articleService.getArticle(id);
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

      this.router.navigate([
        'campaigns',
        this.campaignSerivce.campaign.id,
        'articles',
      ]);
    } catch (err) {
      throw err;
    }

    this.saving = false;
    this.formGroup.enable();
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
}
