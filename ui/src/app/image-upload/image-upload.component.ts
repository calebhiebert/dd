import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

  constructor() {}

  ngOnInit() {
    if (!this.formGroup.contains('imageId')) {
      this.formGroup.addControl('imageId', new FormControl(null));
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
    if (this.formGroup.get('imageId').value != null) {
      return `https://res.cloudinary.com/dqhk8k6iv/image/upload/t_thumb/${this.formGroup.get('imageId').value}.png`;
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
    form.append('upload_preset', 'gvmyptoo');

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.cloudinary.com/v1_1/dqhk8k6iv/auto/upload', true);

    xhr.onload = (e) => {
      const image = JSON.parse(xhr.responseText);
      this.isUploading = false;
      this.file = null;
      this.formGroup.get('imageId').setValue(image.public_id);
    };

    xhr.upload.addEventListener('progress', (e) => {
      this.uploadProgress = (e.loaded / e.total) * 100;
    });

    this.isUploading = true;
    xhr.send(form);
  }
}
