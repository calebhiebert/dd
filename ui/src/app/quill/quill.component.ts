import { Component, OnInit, ElementRef, ViewChild, AfterContentInit, Input } from '@angular/core';
import Quill from 'quill';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'dd-quill',
  templateUrl: './quill.component.html',
  styleUrls: ['./quill.component.css'],
})
export class QuillComponent implements OnInit, AfterContentInit, ControlValueAccessor {
  @Input()
  public readOnly: boolean;

  @ViewChild('container')
  private _container: ElementRef<HTMLDivElement>;

  private _quill: Quill;

  private _onChange: any;
  private _onTouched: any;

  constructor() {}

  ngOnInit() {}

  ngAfterContentInit() {
    this._quill = new Quill(this._container.nativeElement, this.getQuillSettings());

    this._quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
      }
    });
  }

  writeValue(obj: any): void {
    this._quill.setContents(obj.ops);
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  private getQuillSettings() {
    const base: any = {
      theme: 'snow',
      modules: {
        blotFormatter: {},
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block', 'image'],

          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent

          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ align: [] }],

          ['clean'], // remove formatting button
        ],
      },
      readOnly: this.readOnly,
    };

    if (this.readOnly) {
      base.modules.toolbar = false;
      base.modules.theme = undefined;
    } else {
    }

    return base;
  }
}
