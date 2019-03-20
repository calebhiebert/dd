import { Component, OnInit, EventEmitter, Output, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IIcon, IconService } from 'src/app/icon.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'dd-icon-picker',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IconPickerComponent),
      multi: true,
    },
  ],
})
export class IconPickerComponent implements OnInit, ControlValueAccessor {
  @Output()
  public selected = new EventEmitter<IIcon>();

  public isDisabled = false;

  @ViewChild('modal')
  private _modal: ModalComponent<any>;

  private _onChange: any;
  private _onTouched: any;
  private _icon: string;

  constructor(private iconService: IconService) {}

  ngOnInit() {}

  writeValue(obj: any): void {
    this._icon = obj;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public trackIcon(idx: number, icon: IIcon) {
    return icon.id;
  }

  public openPicker() {
    if (this._onTouched) {
      this._onTouched();
    }

    this._modal.open();
  }

  public selectIcon(icon: IIcon) {
    this.selected.emit(icon);

    if (this._onChange) {
      this._onChange(icon.id);
    }

    this._icon = icon.id;

    try {
      this._modal.close(null);
    } catch (err) {
      // Ignore modal close errors
    }
  }

  public clear() {
    this.selected.emit(null);
    this._icon = null;

    if (this._onChange) {
      this._onChange(null);
    }

    try {
      this._modal.close(null);
    } catch (err) {
      // Ignore modal close errors
    }
  }

  public get icons() {
    return this.iconService.getIcons();
  }

  public get selectedIconSrc() {
    if (this._icon) {
      return this.iconService.getIconSrc(this._icon);
    } else {
      return null;
    }
  }
}
