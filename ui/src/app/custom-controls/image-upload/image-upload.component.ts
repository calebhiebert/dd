import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/login.service';
import { CampaignService } from 'src/app/campaign.service';

@Component({
  selector: 'dd-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageUploadComponent),
      multi: true,
    },
  ],
})
export class ImageUploadComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @ViewChild('fupload')
  public fupload: ElementRef<HTMLElement>;

  public file: File = null;
  public fileError: string = null;

  public isDragOver = false;

  public isUploading = false;
  public uploadProgress: number = null;

  public imageId: string;

  @Input()
  public eleId = '';

  private _onChange: any;
  private _onTouched: any;

  constructor(private loginService: LoginService, private campaignService: CampaignService) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    ['dragenter', 'dragover'].forEach((evt) =>
      this.fupload.nativeElement.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.isDragOver = true;
      })
    );

    ['dragleave', 'dragend', 'drop'].forEach((evt) =>
      this.fupload.nativeElement.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.isDragOver = false;
      })
    );

    this.fupload.nativeElement.addEventListener('drop', (e) => {
      if (e.dataTransfer.files.length > 0) {
        this.handleFileUpload(e.dataTransfer.files[0]);
      }
    });
  }

  writeValue(obj: any): void {
    this.imageId = obj;
  }

  public registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  public clearImage() {
    this.writeValue(null);
  }

  public clearError() {
    this.fileError = null;
  }

  public onFileChange(event: Event) {
    const files = (event.target as HTMLInputElement).files;

    if (files.length > 0) {
      this.handleFileUpload(files[0]);
    }
  }

  public get imageURL() {
    if (this.imageId) {
      return `https://res.cloudinary.com/dqhk8k6iv/image/upload/t_thumb/${this.imageId}`;
    } else {
      return null;
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
    xhr.open('POST', `${environment.apiURL}/upload`, true);
    xhr.setRequestHeader('Authorization', `Bearer ${this.loginService.loadToken()}`);

    xhr.onload = (e) => {
      const image = JSON.parse(xhr.responseText);

      this.isUploading = false;
      this.file = null;
      this.writeValue(image.public_id);

      if (this._onChange) {
        this._onChange(image.public_id);
      }
    };

    xhr.upload.addEventListener('progress', (e) => {
      this.uploadProgress = (e.loaded / e.total) * 100;
    });

    this.isUploading = true;
    xhr.send(form);
  }

  public get controlId() {
    return `file-upload-${this.eleId}`;
  }
}
