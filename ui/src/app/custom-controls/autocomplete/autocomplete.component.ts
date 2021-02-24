import { Component, OnInit, Input, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'dd-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements OnInit {
  @Input()
  public placeholder: string;

  @Input()
  public doSearch: SearchFunction;

  @Input()
  public createItem: DropdownItemGenerationFunction;

  @ViewChild('input', { static: true })
  public input: ElementRef<HTMLInputElement>;

  @Output()
  public selection = new EventEmitter<any>();

  public menuShown = false;

  public control: FormControl;
  public loading = false;
  public items: any[];
  public focused = false;

  constructor() {}

  ngOnInit() {
    if (!this.createItem) {
      this.createItem = (item: any) => item.value;
    }

    this.control = new FormControl(null);

    this.control.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
      )
      .subscribe((text) => {
        if (text !== null && text !== undefined) {
          const searchTerm = text.trim();
          this.performSearch(searchTerm);
        }
      });
  }

  private async performSearch(search: string) {
    this.loading = true;

    try {
      const searchResults = await this.doSearch(search);
      this.items = searchResults;

      if (this.items.length > 0) {
        this.menuShown = true;
      }
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  public trackItem(idx: number) {
    return idx;
  }

  public focus(focus: boolean) {
    if (this.focused === false && focus === true) {
      this.performSearch('');
    }

    this.focused = focus;
  }

  public focusInput() {
    this.input.nativeElement.focus();
  }

  public select(item: any) {
    this.selection.emit(item);
    this.menuShown = false;
    this.control.setValue(null);
  }

  public closeMenu() {
    this.menuShown = false;
  }

  public get placeholderText() {
    if (this.placeholder !== undefined) {
      return this.placeholder;
    } else {
      return '';
    }
  }
}

export type SearchFunction = (searchTerm: string) => Promise<any[]>;
export type DropdownItemGenerationFunction = (item: any) => string;
