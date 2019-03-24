import { Component, OnInit, ElementRef, ViewChild, AfterContentInit } from '@angular/core';
import * as SVG from 'svg.js';

@Component({
  selector: 'dd-sketchpad',
  templateUrl: './sketchpad.component.html',
  styleUrls: ['./sketchpad.component.scss'],
})
export class SketchpadComponent implements OnInit, AfterContentInit {
  public size = 50;

  @ViewChild('drawingContainer')
  private _drawingContainer: ElementRef<HTMLDivElement>;

  constructor() {}

  ngOnInit() {}

  ngAfterContentInit() {
    this.resizeCanvas();
    this.initDraw();

    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.resizeCanvas();
      }, 10);
    });
  }

  private resizeCanvas() {
    const maxWidth = this._drawingContainer.nativeElement.parentElement.clientWidth;
    const maxHeight = this._drawingContainer.nativeElement.parentElement.clientHeight;

    const size = Math.min(maxWidth, maxHeight);
    this.size = size * 0.95;
  }

  private initDraw() {
    const draw = SVG(this._drawingContainer.nativeElement).size(this.size, this.size);
    this._drawingContainer.nativeElement.addEventListener('mousedown', (e) => {
      const rect = (e.target as HTMLDivElement).getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      draw
        .rect(100, 100)
        .attr({ fill: '#f06' })
        .move(x, y);
    });
  }
}
