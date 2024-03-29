import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'dd-number-quick-select',
  templateUrl: './number-quick-select.component.html',
  styleUrls: ['./number-quick-select.component.css'],
})
export class NumberQuickSelectComponent implements OnInit {
  @Input()
  public sliderMax = 10;

  @Input()
  public max = 60;

  @Input()
  public min = 1;

  @Input()
  public loading = false;

  @Output()
  public selected = new EventEmitter<number>();

  @Output()
  public cancel = new EventEmitter<boolean>();

  public customInput = false;

  public inputControl: FormControl;

  constructor() {}

  ngOnInit() {
    this.inputControl = new FormControl(1, [Validators.required, Validators.min(this.min), Validators.max(this.max)]);
  }

  public submit() {
    if (!this.inputControl.valid) {
      return;
    }

    this.selected.emit(this.inputControl.value);
  }

  @Input()
  public set number(value: number) {
    this.inputControl.setValue(value);
  }

  public get number(): number {
    return this.inputControl.value;
  }
}
