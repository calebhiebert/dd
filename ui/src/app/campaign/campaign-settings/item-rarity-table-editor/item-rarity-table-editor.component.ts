import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ICampaign, IItemRarity } from 'src/app/campaign.service';

@Component({
  selector: 'dd-item-rarity-table-editor',
  templateUrl: './item-rarity-table-editor.component.html',
  styleUrls: ['./item-rarity-table-editor.component.css'],
})
export class ItemRarityTableEditorComponent implements OnInit {
  @Input()
  public formGroup: FormGroup;

  @Input()
  public campaign: ICampaign;

  constructor() {}

  ngOnInit() {
    if (this.campaign.itemRarities) {
      this.formGroup.addControl(
        'itemRarities',
        new FormArray(
          this.campaign.itemRarities.map((ir) => {
            return this.getControl(ir);
          })
        )
      );
    } else {
      this.formGroup.addControl('itemRarities', new FormArray([]));
    }

    this.formArray.controls = [
      {
        name: 'Common',
        color: '#000000',
      },
      {
        name: 'Uncommon',
        color: '#1fc219',
      },
      {
        name: 'Rare',
        color: '#4990e2',
      },
      {
        name: 'Very Rare',
        color: '#9810e0',
      },
      {
        name: 'Legendary',
        color: '#fea227',
      },
      {
        name: 'Artifact',
        color: '#be8972',
      },
    ].map((r) => this.getControl(r));
  }

  private getControl(rarity?: IItemRarity): FormGroup {
    return new FormGroup({
      name: new FormControl(rarity ? rarity.name : null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      color: new FormControl(rarity ? rarity.color : null, Validators.required),
    });
  }

  public get formArray() {
    return this.formGroup.get('itemRarities') as FormArray;
  }

  public get controls() {
    return this.formArray.controls;
  }
}
