import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CampaignService } from 'src/app/campaign.service';

@Component({
  selector: 'dd-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css'],
})
export class ItemFormComponent implements OnInit {
  @Input()
  public formGroup: FormGroup;

  constructor(private campaignService: CampaignService) {}

  ngOnInit() {}

  public get rarities() {
    return this.campaignService.campaign.itemRarities || [];
  }

  public get name() {
    return this.formGroup.controls.name;
  }

  public get description() {
    return this.formGroup.controls.description;
  }

  public get cost() {
    return this.formGroup.get('cost');
  }

  public get weight() {
    return this.formGroup.get('weight');
  }

  public get rarity() {
    return this.formGroup.get('rarity');
  }
}
