import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'dd-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css'],
})
export class ItemFormComponent implements OnInit {
  public formGroup: FormGroup;

  constructor() {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl('null', Validators.required),
      description: new FormControl(null, Validators.required),
    });

    this.formGroup.valueChanges.subscribe((v) => console.log(v));
  }
}
