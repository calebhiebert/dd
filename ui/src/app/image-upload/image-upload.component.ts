import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login.service';

@Component({
  selector: 'dd-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit, AfterViewInit {
  @ViewChild('fupload')
  public fupload: ElementRef<HTMLElement>;

  public file: File = null;
  public fileError: string = null;

  public isDragOver = false;

  public isUploading = false;
  public uploadProgress: number = null;

  @Input()
  public formGroup: FormGroup;

  @Input()
  public eleId = '';

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    if (!this.formGroup.contains('imageId')) {
      this.formGroup.addControl('imageId', new FormControl(null));
    }

    if (!this.formGroup.contains('imageColor1')) {
      this.formGroup.addControl('imageColor1', new FormControl(null));
      this.formGroup.addControl('imageColor2', new FormControl(null));
    }
  }

  ngAfterViewInit(): void {
    ['dragenter', 'dragover'].forEach((evt) =>
      this.fupload.nativeElement.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.isDragOver = true;
      }),
    );

    ['dragleave', 'dragend', 'drop'].forEach((evt) =>
      this.fupload.nativeElement.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.isDragOver = false;
      }),
    );

    this.fupload.nativeElement.addEventListener('drop', (e) => {
      if (e.dataTransfer.files.length > 0) {
        this.handleFileUpload(e.dataTransfer.files[0]);
      }
    });
  }

  public clearImage() {
    this.formGroup.get('imageId').reset();
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
    if (
      this.formGroup.get('imageId').value !== null &&
      this.formGroup.get('imageId').value !== undefined &&
      this.formGroup.get('imageId').value !== ''
    ) {
      return `https://res.cloudinary.com/dqhk8k6iv/image/upload/t_thumb/${this.formGroup.get('imageId').value}`;
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

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${environment.apiURL}/upload`, true);
    xhr.setRequestHeader('Authorization', `Bearer ${this.loginService.loadToken()}`);

    xhr.onload = (e) => {
      const image = JSON.parse(xhr.responseText);

      this.isUploading = false;
      this.file = null;
      this.formGroup.get('imageId').setValue(image.public_id);

      if (image.colors) {
        this.imageColor1.setValue(image.colors[0][0]);
        this.imageColor2.setValue(image.colors[1][0]);
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

  public get control() {
    return this.formGroup.get('imageId');
  }

  public get imageColor1() {
    return this.formGroup.get('imageColor1');
  }

  public get imageColor2() {
    return this.formGroup.get('imageColor2');
  }
}
