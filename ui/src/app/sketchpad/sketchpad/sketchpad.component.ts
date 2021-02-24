import { Component, OnInit, ElementRef, ViewChild, AfterContentInit } from '@angular/core';
import * as LC from 'literallycanvas/lib/js/literallycanvas-core.min.js';
import 'literallycanvas/lib/css/literallycanvas.css';

@Component({
  selector: 'dd-sketchpad',
  templateUrl: './sketchpad.component.html',
  styleUrls: ['./sketchpad.component.scss'],
})
export class SketchpadComponent implements OnInit, AfterContentInit {
  @ViewChild('drawingContainer', { static: true })
  private _drawingContainer: ElementRef<HTMLDivElement>;

  constructor() {}

  ngOnInit() {}

  ngAfterContentInit() {
    const lc = LC.init(this._drawingContainer.nativeElement);
    console.log(lc);
  }
}
