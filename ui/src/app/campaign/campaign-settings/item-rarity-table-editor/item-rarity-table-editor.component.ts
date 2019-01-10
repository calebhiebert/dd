import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'dd-item-rarity-table-editor',
  templateUrl: './item-rarity-table-editor.component.html',
  styleUrls: ['./item-rarity-table-editor.component.css'],
})
export class ItemRarityTableEditorComponent implements OnInit {
  public formGroup: FormGroup;

  constructor() {}

  ngOnInit() {}

  public get formArray() {
    return this.formGroup.get('');
  }
}
