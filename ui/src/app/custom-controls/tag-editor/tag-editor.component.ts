import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'dd-tag-editor',
  templateUrl: './tag-editor.component.html',
  styleUrls: ['./tag-editor.component.css'],
})
export class TagEditorComponent implements OnInit {
  @Input()
  public formGroup: FormGroup;

  @Input()
  public controlName = 'tags';

  @ViewChild('input', { static: true })
  private input: ElementRef<HTMLInputElement>;

  private _currentValue = '';
  private _previousValue = '';

  constructor() {}

  ngOnInit() {
    if (!this.formGroup.contains(this.controlName)) {
      this.formGroup.addControl(this.controlName, new FormArray([]));
    }
  }

  public removeTag(t) {
    const index = this.formArray.value.indexOf(t);

    if (index !== -1) {
      this.formArray.removeAt(index);
      this.formGroup.markAsDirty();
    }
  }

  public onInputEvent(e) {
    switch (e.key) {
      case 'Enter':
        if (this._currentValue.trim().length > 0 && this.formArray.value.indexOf(this._currentValue.trim()) === -1) {
          this.formArray.push(new FormControl(this._currentValue.trim()));
          this.formGroup.markAsDirty();

          this.input.nativeElement.value = '';
          this._previousValue = this._currentValue.trim();
          this._currentValue = '';
        }
        break;
      case 'Backspace':
        if (this._currentValue === '' && this._previousValue === '' && this.formArray.length > 0) {
          console.log(this._previousValue);
          const control = this.formArray.controls[this.formArray.controls.length - 1];
          this.formArray.removeAt(this.formArray.length - 1);
          this.formGroup.markAsDirty();

          this.input.nativeElement.value = control.value;
          this._previousValue = this._currentValue.trim();
          this._currentValue = control.value;
        } else {
          this._previousValue = '';
        }
        break;
    }
  }

  public onInputChanged(e) {
    this._previousValue = this._currentValue;
    this._currentValue = e.target.value;
  }

  public get formArray() {
    return this.formGroup.get(this.controlName) as FormArray;
  }
}
