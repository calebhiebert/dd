import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'dd-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit, AfterViewInit {
  @ViewChild('fupload')
  public fupload: ElementRef<HTMLElement>;

  public isDragOver = false;

  public isUploading = false;

  constructor() {}

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
  }

  public onFileChange(event: Event) {
    console.log(event);
  }
}
