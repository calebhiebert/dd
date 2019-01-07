import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Campaign } from 'src/app/campaign';

@Component({
  selector: 'dd-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.css'],
})
export class CampaignFormComponent implements OnInit {
  @Input()
  public formGroup: FormGroup;

  @Input()
  public campaign: Campaign;

  constructor() {}

  ngOnInit() {
    this.formGroup.addControl(
      'name',
      new FormControl(this.campaign ? this.campaign.name : null, [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(2),
      ])
    );

    this.formGroup.addControl(
      'description',
      new FormControl(this.campaign ? this.campaign.description : null, [
        Validators.required,
        Validators.minLength(3),
      ])
    );

    this.formGroup.addControl(
      'imageId',
      new FormControl(
        this.campaign.imageId === '' || !this.campaign
          ? null
          : this.campaign.imageId
      )
    );
  }

  public get name() {
    return this.formGroup.get('name');
  }

  public get description() {
    return this.formGroup.get('description');
  }
}
