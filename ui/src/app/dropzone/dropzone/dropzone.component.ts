import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import Dropzone from 'dropzone';

@Component({
  selector: 'dd-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.css'],
})
export class DropzoneComponent implements OnInit, AfterViewInit {
  @ViewChild('dropzone')
  private _dropzone: ElementRef<HTMLDivElement>;

  private _dz: any;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this._dz = new Dropzone(this._dropzone.nativeElement, {
      url: '/help',
    });
  }
}
