import { Component, OnInit } from '@angular/core';
import { CampaignService } from 'src/app/campaign.service';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/login.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  public mapId: string = null;

  public formGroup: FormGroup;

  constructor(
    private campaignService: CampaignService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      file: new FormControl(null, [Validators.required]),
    });
  }

  public viewMap() {
    this.router.navigate([
      'campaigns',
      this.campaignService.campaign.id,
      'maps',
      this.mapId,
    ]);
  }

  public onFileChange(event: Event) {
    const files = (event.target as HTMLInputElement).files;

    if (files.length > 0) {
      this.file = files[0];
    }
  }

  public submit() {
    if (this.formGroup.invalid) {
      return;
    }

    this.handleFileUpload(this.file);
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
    form.append('name', this.name.value);

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

      this.mapId = result.id;

      this.isUploading = false;
      this.file = null;
    };

    xhr.upload.addEventListener('progress', (e) => {
      this.uploadProgress = (e.loaded / e.total) * 100;
    });

    this.isUploading = true;
    xhr.send(form);
  }

  public get fileControl() {
    return this.formGroup.get('file');
  }

  public get name() {
    return this.formGroup.get('name');
  }
}
