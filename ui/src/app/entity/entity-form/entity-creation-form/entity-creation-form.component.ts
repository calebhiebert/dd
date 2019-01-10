import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EntityService, IEntity } from 'src/app/entity.service';
import { CampaignService } from 'src/app/campaign.service';
import { numberValidator } from '../../dynamic-attribute-form/dynamic-attribute-form.component';
import { LoginService } from 'src/app/login.service';

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

  public entity: IEntity;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private entityService: EntityService,
    private campaignService: CampaignService,
    private login: LoginService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('ent_id');

      if (this.editing) {
        this.loadEntity(id);
      }
    });

    this.attributesFormGroup = new FormGroup({});

    this.formGroup = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      xp: new FormControl(null, [
        Validators.required,
        numberValidator,
        Validators.min(0),
        Validators.max(2147483647),
      ]),
      imageId: new FormControl('uncertainty'),
    });

    // this.formGroup.valueChanges.subscribe((v) =>
    //   console.log(v, this.formGroup)
    // );
  }

  public async save() {
    this.saving = true;
    this.formGroup.disable();
    this.attributesFormGroup.disable();

    if (this.editing) {
      try {
        await this.entityService.updateEntity(this.constructEntity());
        this.router.navigate(['../'], { relativeTo: this.route });
      } catch (err) {
        console.log('SAVE ERR', err);
      }
    } else {
      try {
        const ent = await this.entityService.createEntity(
          this.constructEntity()
        );

        this.router.navigate([
          'campaigns',
          this.campaignService.campaign.id,
          'entities',
          ent.id,
        ]);
      } catch (err) {
        console.log('Create ERR', err);
      }
    }

    this.formGroup.enable();
    this.attributesFormGroup.enable();
    this.saving = false;
  }

  private constructEntity(): IEntity {
    const v = this.formGroup.value;

    const ent: IEntity = {
      id: this.entity ? this.entity.id : '',
      name: v.name,
      description: v.description,
      xp: v.xp,
      imageId: v.imageId,
      userId: this.editing ? this.entity.userId : this.login.id,
      campaignId: this.campaignService.campaign.id,
      entityPresetId: this.preset.id,
      attributes: [],
    };

    for (const [k, v] of Object.entries(this.attributesFormGroup.value)) {
      const preset = this.preset.attributes.find((p) => p.name === k);

      ent.attributes.push({
        name: preset.name,
        data: v as string,
        type: preset.type,
      });
    }

    return ent;
  }

  private async loadEntity(id: string) {
    this.loading = true;

    try {
      const ent = await this.entityService.getEntity(id);

      this.entity = ent;

      setTimeout(() => {
        this.formGroup.patchValue(ent);

        for (let attr of ent.attributes) {
          if (this.attributesFormGroup.get(attr.name)) {
            this.attributesFormGroup.get(attr.name).setValue(attr.data);
          }
        }
      }, 1);
    } catch (err) {
      console.log('LOAD ERR', err);
    }

    this.loading = false;
  }

  public get preset() {
    if (this.editing) {
      return this.entity.preset;
    } else {
      return this.campaignService.campaign.entityPresets.find(
        (ep) => ep.id === this.route.snapshot.paramMap.get('ent_type_id')
      );
    }
  }

  public get name() {
    return this.formGroup.get('name');
  }

  public get description() {
    return this.formGroup.get('description');
  }

  public get xp() {
    return this.formGroup.get('xp');
  }

  public get editing() {
    return this.route.snapshot.data.editing;
  }
}
