import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { dd } from 'src/dd.pb';

@Component({
  selector: 'dd-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.css'],
})
export class CampaignFormComponent implements OnInit {
  @Input()
  public formGroup: FormGroup;

  @Input()
  public campaign: dd.ICampaignCore;

  constructor() {}

  ngOnInit() {
    this.formGroup.addControl(
      'name',
      new FormControl(this.campaign.name, [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(2),
      ])
    );

    this.formGroup.addControl(
      'description',
      new FormControl(this.campaign.description, [
        Validators.required,
        Validators.minLength(3),
      ])
    );

    this.formGroup.addControl(
      'imageId',
      new FormControl(this.campaign.imageId)
    );
  }

  public get name() {
    return this.formGroup.get('name');
  }

  public get description() {
    return this.formGroup.get('description');
  }
}
