import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IItem } from 'src/app/item.service';

@Component({
  selector: 'dd-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css'],
})
export class ItemFormComponent implements OnInit {
  @Input()
  public inputItem: IItem;

  public formGroup: FormGroup;

  constructor() {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      description: new FormControl(null, Validators.required),
      imageId: new FormControl(null),
      rarity: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
    });

    if (this.inputItem !== undefined) {
      this.formGroup.patchValue({
        name: this.inputItem.name,
        description: this.inputItem.description,
        imageId: this.inputItem.imageId,
      });
    }
  }

  public get name() {
    return this.formGroup.controls.name;
  }

  public get description() {
    return this.formGroup.controls.description;
  }
}
