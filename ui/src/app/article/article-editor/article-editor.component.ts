import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CampaignService } from 'src/app/campaign.service';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'dd-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
})
export class ArticleEditorComponent implements OnInit {
  public froalaOptions: any;

  public formGroup: FormGroup;

  constructor(
    private campaignSerivce: CampaignService,
    private login: LoginService
  ) {}

  ngOnInit() {
    this.froalaOptions = this.makeFroalaOptions();

    this.formGroup = new FormGroup({
      body: new FormControl(null),
    });

    this.formGroup.valueChanges.subscribe(console.log);
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
}
