import { Component, OnInit } from '@angular/core';
import { CampaignService } from 'src/app/campaign.service';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'dd-map-upload',
  templateUrl: './map-upload.component.html',
  styleUrls: ['./map-upload.component.css'],
})
export class MapUploadComponent implements OnInit {
  public fileError: string;
  public uploadProgress: number;
  public file: any;
  public isUploading = false;

  constructor(
    private campaignService: CampaignService,
    private loginService: LoginService
  ) {}

  ngOnInit() {}

  public onFileChange(event: Event) {
    const files = (event.target as HTMLInputElement).files;

    if (files.length > 0) {
      this.handleFileUpload(files[0]);
    }
  }

  public handleFileUpload(file: File) {
    this.fileError = null;
    this.uploadProgress = null;

    if (!file.type.startsWith('image/')) {
      this.fileError = 'Incorrect file type! Only images are accepted';
      return;
    }

    this.file = file;

    const form = new FormData();
    form.append('file', this.file);

    if (this.campaignService.campaign) {
      form.append('campaignId', this.campaignService.campaign.id);
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${environment.apiURL}/maps`, true);
    xhr.setRequestHeader(
      'Authorization',
      `Bearer ${this.loginService.loadToken()}`
    );

    xhr.onload = (e) => {
      const result = JSON.parse(xhr.responseText);
      console.log(result);

      this.isUploading = false;
      this.file = null;
    };

    xhr.upload.addEventListener('progress', (e) => {
      this.uploadProgress = (e.loaded / e.total) * 100;

      console.log(this.uploadProgress);
    });

    this.isUploading = true;
    xhr.send(form);
  }
}
