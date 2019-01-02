import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Entity } from 'src/app/entity';
import { EntityService } from 'src/app/entity.service';
import { CampaignService } from 'src/app/campaign.service';
import { Attribute } from 'src/app/attributes';

@Component({
  selector: 'dd-entity-creation-form',
  templateUrl: './entity-creation-form.component.html',
  styleUrls: ['./entity-creation-form.component.css'],
})
export class EntityCreationFormComponent implements OnInit {
  public loading = false;

  public saving = false;

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

    this.formGroup.valueChanges.subscribe((v) => {
      console.log(v, this.formGroup);
    });
  }

  public async save() {
    console.log(this.attributesFormGroup);

    this.saving = true;
    this.formGroup.disable();
    this.attributesFormGroup.disable();

    try {
      const res = await this.entityService.saveEntity(
        this.campaignService.campaign.id,
        this.constructEntity()
      );
    } catch (err) {
      console.log('SAVE ERR', err);
    }

    this.formGroup.enable();
    this.attributesFormGroup.enable();
    this.saving = false;
  }

  private constructEntity(): Entity {
    const ent: Entity = {
      ...this.formGroup.value,
    };

    const attributes: Attribute[] = [];

    for (let [k, v] of Object.entries(this.attributesFormGroup.value)) {
      const preset = this.entity.preset.attributes.find((p) => p.name === k);

      attributes.push({
        name: preset.name,
        data: v as string,
        type: preset.type,
      });
    }

    ent.attributes = attributes;

    return ent;
  }

  private async loadEntity(id: string) {
    this.loading = true;

    try {
      const ent = await this.entityService.getEntity(
        this.campaignService.campaign.id,
        id
      );

      this.entity = ent;
      this.formGroup.get('id').setValue(ent.id);
    } catch (err) {
      console.log('LOAD ERR', err);
    }

    this.loading = false;
  }

  public get name() {
    return this.formGroup.get('name');
  }

  public get description() {
    return this.formGroup.get('description');
  }
}
