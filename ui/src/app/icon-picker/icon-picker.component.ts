import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IconService, IIcon } from '../icon.service';
import { FormControl } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'dd-icon-picker',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.scss'],
})
export class IconPickerComponent implements OnInit {
  @Output()
  public selected = new EventEmitter<IIcon>();

  @Input()
  public formControl: FormControl;

  @ViewChild('modal')
  private _modal: ModalComponent<any>;

  constructor(private iconService: IconService) {}

  ngOnInit() {}

  public trackIcon(idx: number, icon: IIcon) {
    return icon.id;
  }

  public openPicker() {
    this._modal.open();
  }

  public selectIcon(icon: IIcon) {
    this.selected.emit(icon);

    if (this.formControl) {
      this.formControl.setValue(icon.id);
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
    if (this.formControl && this.formControl.value) {
      return this.iconService.getIconSrc(this.formControl.value);
    } else {
      return null;
    }
  }
}
