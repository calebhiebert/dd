import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  EventEmitter,
  Output,
} from '@angular/core';
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
  public doSearch: (searchTerm: string) => Promise<any[]>;

  @ViewChild('input')
  public input: ElementRef<HTMLInputElement>;

  @Output()
  public onSelect = new EventEmitter<any>();

  public menuShown = false;

  public control: FormControl;
  public loading = false;
  public items: any[];
  public focused = false;

  constructor() {}

  ngOnInit() {
    this.control = new FormControl(null);

    this.control.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged()
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
    this.onSelect.emit(item);
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
