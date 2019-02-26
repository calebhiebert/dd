import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterContentInit,
  Input,
  forwardRef,
} from '@angular/core';
import Quill from 'quill';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CampaignService } from '../campaign.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dd-quill',
  templateUrl: './quill.component.html',
  styleUrls: ['./quill.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuillComponent),
      multi: true,
    },
  ],
})
export class QuillComponent
  implements OnInit, AfterContentInit, ControlValueAccessor {
  @Input()
  public readOnly: boolean;

  @Input()
  public simple: boolean;

  @Input()
  public placeholder: string;

  @Input()
  public set value(value: any) {
    this.writeValue(value);
  }

  @ViewChild('container')
  private _container: ElementRef<HTMLDivElement>;

  private _quill: Quill;

  private _onChange: any;
  private _onTouched: any;

  private _writeQueue: any[] = [];

  constructor(
    private campaignService: CampaignService,
    private router: Router
  ) {}

  ngOnInit() {}

  ngAfterContentInit() {
    this._quill = new Quill(
      this._container.nativeElement,
      this.getQuillSettings()
    );

    if (this.readOnly) {
      this._container.nativeElement
        .querySelectorAll('.ql-editor')
        .forEach((n) => n.classList.add('p-0'));
    }

    this._quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user' && this._onChange) {
        this._onChange(this._quill.getContents());
      }
    });

    this._quill.on('selection-change', (range, oldRange, source) => {
      if (source === 'user' && this._onTouched) {
        this._onTouched();
      }
    });

    while (this._writeQueue.length > 0) {
      this.writeValue(this._writeQueue.pop());
    }
  }

  writeValue(obj: any): void {
    if (!this._quill) {
      this._writeQueue.push(obj);
    } else {
      if (obj !== null && obj !== undefined) {
        this._quill.setContents(obj.ops);

        this.setupArticleMentions(
          this._container.nativeElement.querySelectorAll(
            '[data-type="article"]'
          )
        );

        this.setupImages(this._container.nativeElement.querySelectorAll('img'));
      } else {
        this._quill.setContents([]);
      }
    }
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
      placeholder: this.placeholder,
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
      base.theme = 'snow';

      if (this.simple) {
        base.modules.toolbar = [
          [
            'bold',
            'italic',
            'underline',
            'strike',
            { list: 'ordered' },
            { list: 'bullet' },
            'blockquote',
          ],
        ];
      }
    }
    return base;
  }

  private setupArticleMentions(nodes: NodeListOf<HTMLSpanElement>) {
    nodes.forEach((node) => {
      const id = node.dataset.id;

      node.addEventListener('click', () => {
        this.router.navigate([
          'campaigns',
          this.campaignService.campaign.id,
          'articles',
          id,
        ]);
      });
    });
  }

  private setupImages(nodes: NodeListOf<HTMLImageElement>) {
    nodes.forEach((n) => {
      n.classList.add('img-responsive');
    });
  }
}
