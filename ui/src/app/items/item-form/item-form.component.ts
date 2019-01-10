import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IItem } from 'src/app/item.service';
import { CampaignService } from 'src/app/campaign.service';

@Component({
  selector: 'dd-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css'],
})
export class ItemFormComponent implements OnInit {
  @Input()
  public inputItem: IItem;

  @Input()
  public formGroup: FormGroup;

  constructor(private campaignService: CampaignService) {}

  ngOnInit() {
    this.formGroup.addControl(
      'name',
      new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ])
    );

    this.formGroup.addControl(
      'description',
      new FormControl(null, Validators.required)
    );
    this.formGroup.addControl('imageId', new FormControl(null));
    this.formGroup.addControl(
      'rarity',
      new FormControl(null, Validators.required)
    );
    this.formGroup.addControl(
      'type',
      new FormControl(null, Validators.required)
    );

    if (this.inputItem !== undefined) {
      this.formGroup.patchValue({
        name: this.inputItem.name,
        description: this.inputItem.description,
        imageId: this.inputItem.imageId,
      });
    }
  }

  public get rarities() {
    return this.campaignService.campaign.itemRarities || [];
  }

  public get name() {
    return this.formGroup.controls.name;
  }

  public get description() {
    return this.formGroup.controls.description;
  }
}
