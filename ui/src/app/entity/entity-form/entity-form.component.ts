import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationModalComponent } from 'src/app/confirmation-modal/confirmation-modal.component';
import { EntityService, IEntityPreset } from 'src/app/entity.service';
import { CampaignService } from 'src/app/campaign.service';
import { numberValidator } from '../dynamic-attribute-form/dynamic-attribute-form.component';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'dd-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css'],
})
export class EntityFormComponent implements OnInit {
  public saving = false;
  public deleting = false;
  public loading = false;

  public formGroup: FormGroup;

  public entityPreset: IEntityPreset;

  @ViewChild('confirmmodal')
  public confirmModal: ConfirmationModalComponent;

  constructor(
    private entityService: EntityService,
    private campaignService: CampaignService,
    private login: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.entityPreset = {
      id: '',
      name: '',
      description: '',
      userId: '',
      imageId: '',
      campaignId: '',
      playerCreatable: false,
    };

    this.formGroup = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      health: new FormGroup({
        mode: new FormControl('0'),
        max: new FormControl(null, [Validators.min(0), numberValidator]),
        current: new FormControl(null, [Validators.min(0), numberValidator]),
      }),
      playerCreatable: new FormControl(false),
      imageId: new FormControl(null, Validators.required),
      attributes: new FormArray([]),
    });

    this.route.params.subscribe((params) => {
      if (params.ent_id) {
        this.loadEntityPreset(params.ent_id);
      }
    });
  }

  private async loadEntityPreset(id: string) {
    this.loading = true;
    this.formGroup.disable();

    try {
      const preset = await this.entityService.getEntityPreset(id);
      this.entityPreset = preset;

      for (let i = 0; i < preset.attributes.length; i++) {
        this.addAttribute();
      }

      setTimeout(() => {
        this.formGroup.patchValue({
          id: preset.id,
          name: preset.name,
          description: preset.description,
          attributes: preset.attributes,
          imageId: preset.imageId,
          playerCreatable: preset.playerCreatable,
        });
      }, 1);
    } catch (err) {
      console.log('LOAD ERR', err);
    }

    this.loading = false;
    this.formGroup.enable();
  }

  public submit() {}

  public removeAttribute(i: number) {
    (this.formGroup.get('attributes') as FormArray).removeAt(i);
  }

  public async save() {
    if (this.formGroup.valid) {
      this.formGroup.disable();
      this.saving = true;

      if (this.editing) {
        try {
          const v = this.formGroup.value;

          await this.entityService.updateEntityPreset({
            id: this.entityPreset.id,
            userId: this.login.id,
            campaignId: this.campaignService.campaign.id,
            name: v.name,
            description: v.description,
            imageId: v.imageId,
            playerCreatable: v.playerCreatable,
            attributes: v.attributes,
          });

          await this.router.navigate(['../../..', 'settings'], {
            relativeTo: this.route,
          });
        } catch (err) {
          console.log('SAVE ERR', err);
        }
      } else {
        const v = this.formGroup.value;

        const ep = await this.entityService.createEntityPreset({
          id: this.entityPreset.id,
          userId: this.login.id,
          campaignId: this.campaignService.campaign.id,
          name: v.name,
          description: v.description,
          imageId: v.imageId,
          playerCreatable: v.playerCreatable,
          attributes: v.attributes,
        });

        await this.router.navigate(['../..', 'settings'], {
          relativeTo: this.route,
        });

        console.log('EF Create', ep);
      }

      this.saving = false;
      this.formGroup.enable();
    }
  }

  public async delete() {
    if (
      await this.confirmModal.getConfirmation(
        'Are you sure you want to delete this entity? This cannot be undone'
      )
    ) {
      this.deleting = true;
      this.formGroup.disable();
      try {
        await this.entityService.deleteEntityPreset(
          this.campaignService.campaign.id,
          '1'
        );
        this.router.navigate(['../../..', 'settings'], {
          relativeTo: this.route,
        });
      } catch (err) {
        console.log('DEL ERR', err);
      }
      this.formGroup.enable();
      this.deleting = false;
    }
  }

  public addAttribute() {
    (this.formGroup.get('attributes') as FormArray).push(new FormGroup({}));
  }

  public get attributeControls() {
    return (this.formGroup.get('attributes') as FormArray).controls;
  }

  public get name() {
    return this.formGroup.get('name');
  }

  public get description() {
    return this.formGroup.get('description');
  }

  public get editing() {
    return this.route.snapshot.data.editing;
  }
}
