import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { EntityService } from '../entity.service';
import { Campaign } from '../campaign';
import { CampaignService } from '../campaign.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

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

  @ViewChild('confirmmodal')
  public confirmModal: ConfirmationModalComponent;

  constructor(
    private entityService: EntityService,
    private campaignService: CampaignService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
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
        max: new FormControl(null, [Validators.min(0)]),
        current: new FormControl(null, [Validators.min(0)]),
      }),
      playerCreatable: new FormControl(false),
      imageId: new FormControl('shrug', Validators.required),
      attributes: new FormArray([]),
    });

    this.route.params.subscribe((params) => {
      if (params.ent_id !== '') {
        this.loadEntityPreset(params.ent_id);
      }
    });
  }

  private async loadEntityPreset(id: string) {
    this.loading = true;
    this.formGroup.disable();

    try {
      const preset = await this.entityService.getEntityPreset(
        this.campaignService.campaign.id,
        id
      );

      console.log(preset);

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
          health: preset.health,
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

  public async save() {
    if (this.formGroup.valid) {
      this.formGroup.disable();
      this.saving = true;
      try {
        const preset = await this.entityService.saveEntityPreset(
          this.campaignService.campaign.id,
          this.formGroup.value
        );

        this.router.navigate(['../../..', 'settings'], {
          relativeTo: this.route,
        });
      } catch (err) {
        console.log('SAVE ERR', err);
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
}
