import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Entity } from 'src/app/entity';
import { EntityService } from 'src/app/entity.service';
import { CampaignService } from 'src/app/campaign.service';

@Component({
  selector: 'dd-entity-creation-form',
  templateUrl: './entity-creation-form.component.html',
  styleUrls: ['./entity-creation-form.component.css'],
})
export class EntityCreationFormComponent implements OnInit {
  public loading = false;

  public formGroup: FormGroup;

  public attributesFormGroup: FormGroup;

  private entity: Entity;

  constructor(
    private route: ActivatedRoute,
    private entityService: EntityService,
    private campaignService: CampaignService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('ent_id');
      this.loadEntity(id);
    });

    this.attributesFormGroup = new FormGroup({});

    this.formGroup = new FormGroup({
      id: new FormControl(null, Validators.required),
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      imageId: new FormControl('uncertainty'),
    });
  }

  private async loadEntity(id: string) {
    this.loading = true;

    try {
      const ent = await this.entityService.getEntity(
        this.campaignService.campaign.id,
        id
      );

      this.entity = ent;
    } catch (err) {
      console.log('LOAD ERR', err);
    }

    this.loading = false;
  }
}
