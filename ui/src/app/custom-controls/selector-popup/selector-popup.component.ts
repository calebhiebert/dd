import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { debounceTime } from 'rxjs/operators';

export interface ISelectOption {
  displayHtml: string;
  value: any;
}

@Component({
  selector: 'dd-selector-popup',
  templateUrl: './selector-popup.component.html',
  styleUrls: ['./selector-popup.component.css'],
})
export class SelectorPopupComponent implements OnInit {
  @Input()
  public searchable: boolean;

  @Input()
  public title = 'Pick One!';

  @Input()
  public loadSelectItems: (search: string) => Promise<ISelectOption[]>;

  public loading = false;
  public searchControl: FormControl;
  public search: string;
  public selectItems: ISelectOption[];

  @ViewChild('modal', { static: true })
  private modal: ModalComponent<any>;

  private _selectResolver: any;

  constructor() {}

  ngOnInit() {
    this.searchControl = new FormControl(null);

    this.searchControl.valueChanges.pipe(debounceTime(250)).subscribe((search) => {
      this.search = search;
      this.load();
    });

    if (!this.selectItems) {
      this.load();
    }
  }

  private async load() {
    this.loading = true;

    if (!this.loadSelectItems) {
      console.warn('No function provided to load select items');
      return;
    }

    try {
      this.selectItems = await this.loadSelectItems(this.search);
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  public select(item: ISelectOption) {
    if (this._selectResolver) {
      this._selectResolver(item);
    } else {
      console.warn('Item was selected but no resolver was present');
    }

    try {
      this.modal.close(null);
    } catch (err) {
      // Ignore this
    }
  }

  public openSelector(options?: ISelectOption[]): Promise<any> {
    this.selectItems = options;
    this.searchControl.setValue(null);

    if (!this.selectItems) {
      this.search = '';
      this.load();
    }

    this.modal.open().then(() => {
      if (this._selectResolver) {
        this._selectResolver(null);
        this._selectResolver = undefined;
      }
    });

    return new Promise((resolve) => {
      this._selectResolver = resolve;
    });
  }
}
