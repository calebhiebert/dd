import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'dd-experience-table-editor',
  templateUrl: './experience-table-editor.component.html',
  styleUrls: ['./experience-table-editor.component.css'],
})
export class ExperienceTableEditorComponent implements OnInit {
  public formGroup: FormGroup;

  constructor() {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      rows: new FormArray([]),
    });

    for (let i = 0; i < 3; i++) {
      this.addRow();
    }
    this.formGroup.setValue({
      rows: [10, 20, 30],
    });
  }

  public addRow() {
    (this.formGroup.get('rows') as FormArray).push(new FormControl(0));
  }

  public get controls() {
    return (this.formGroup.get('rows') as FormArray).controls;
  }
}
