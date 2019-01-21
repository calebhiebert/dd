import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'dd-tag-editor',
  templateUrl: './tag-editor.component.html',
  styleUrls: ['./tag-editor.component.css']
})
export class TagEditorComponent implements OnInit {
  public inputControl: FormControl;

  @Input()
  public formGroup: FormGroup;

  @Input()
  public controlName = 'tags';

  private previousInput: string;
  private justHadValue = false;

  constructor() {}

  ngOnInit() {
    this.inputControl = new FormControl(null, [Validators.maxLength(20)]);

    this.inputControl.valueChanges.subscribe(v => {
      if (this.previousInput !== '' && v === '') {
        this.justHadValue = true;
      } else {
        this.justHadValue = false;
      }

      this.previousInput = v;
    });

    if (!this.formGroup.contains(this.controlName)) {
      this.formGroup.addControl(this.controlName, new FormArray([]));
    }
  }

  public removeTag(t) {
    const index = this.formArray.value.indexOf(t);

    if (index !== -1) {
      this.formArray.removeAt(index);
    }
  }

  public onInputEvent(e) {
    switch (e.key) {
      case 'Enter':
        if (
          this.inputControl.valid &&
          this.inputControl.value.trim().length > 0 &&
          this.formArray.value.indexOf(this.inputControl.value.trim()) === -1
        ) {
          this.formArray.push(
            new FormControl(this.inputControl.value.trim(), [
              Validators.required
            ])
          );
          this.inputControl.setValue('');
        }
        break;
      case 'Backspace':
        if (this.inputControl.value === '' && !this.justHadValue) {
          const control = this.formArray.controls.pop();
          this.inputControl.setValue(control.value);
        }
        this.justHadValue = false;
        break;
    }
  }

  public get formArray() {
    return this.formGroup.get(this.controlName) as FormArray;
  }
}
