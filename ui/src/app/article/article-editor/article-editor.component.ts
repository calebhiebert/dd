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
export class ArticleEditorComponent implements OnInit, ComponentCanDeactivate {
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
    private location: Location,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(30),
      ]),
      content: new FormControl(null),
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

  canDeactivate() {
    return !this.formGroup.dirty;
  }

  private constructArticle(): IArticle {
    const v = this.formGroup.value;

    const article: IArticle = {
      name: v.name,
      content: v.content,
      published: v.published,
      campaignId: this.campaignSerivce.campaign.id,
      userId: this.login.id,
      tags: v.tags || [],
      icon: v.icon,
    };

    if (this.editing) {
      article.id = this._article.id;
      article.userId = this._article.userId;
      article.mapId = this._article.mapId;
      article.lat = this._article.lat;
      article.lng = this._article.lng;
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
    } catch (err) {
      throw err;
    }

    this.saving = false;
    this.formGroup.enable();
    this.formGroup.markAsPristine();
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
