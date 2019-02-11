import { Component, OnInit, ViewChild } from '@angular/core';
import { ISpell, SpellService } from 'src/app/spell.service';
import { ConfirmationModalComponent } from 'src/app/confirmation-modal/confirmation-modal.component';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from 'src/app/campaign.service';
import { Location } from '@angular/common';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'dd-spell-form',
  templateUrl: './spell-form.component.html',
  styleUrls: ['./spell-form.component.css'],
})
export class SpellFormComponent implements OnInit {
  public loading = false;
  public spell: ISpell;
  public saving = false;
  public deleting = false;

  @ViewChild('confirmmodal')
  public confirmModal: ConfirmationModalComponent;

  public formGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private spellService: SpellService,
    private router: Router,
    private campaignService: CampaignService,
    private location: Location,
    private login: LoginService
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      description: new FormControl(null, Validators.required),
      imageId: new FormControl(null),
      playerVisible: new FormControl(true),
      tags: new FormArray([]),
    });

    if (this.editing) {
      this.route.params.subscribe((params) => {
        const id = params.s_id;
        this.load(id);
      });
    }
  }

  private async load(id: string) {
    this.loading = true;
    this.spell = null;
    this.formGroup.disable();

    try {
      const spell = await this.spellService.getSpell(id);
      this.spell = spell;

      this.formGroup.patchValue(spell);

      if (this.spell.tags) {
        (this.formGroup.get(
          'tags'
        ) as FormArray).controls = this.spell.tags.map(
          (t) => new FormControl(t)
        );
      }
    } catch (err) {
      throw err;
    }

    this.formGroup.enable();
    this.loading = false;
  }

  private constructSpell(): ISpell {
    const v = this.formGroup.value;

    const spell: ISpell = {
      campaignId: this.campaignService.campaign.id,
      playerVisible: v.playerVisible,
      name: v.name,
      description: v.description,
      imageId: v.imageId,
      userId: this.login.id,
      tags: v.tags,
    };

    if (this.editing) {
      spell.userId = this.spell.userId;
      spell.id = this.spell.id;
    }

    return spell;
  }

  public async save() {
    if (!this.formGroup.valid) {
      return;
    }

    const spell = this.constructSpell();

    this.formGroup.disable();
    this.saving = true;

    let redirectSpellId: string;

    try {
      if (this.editing) {
        await this.spellService.updateSpell(spell);
        redirectSpellId = this.spell.id;
      } else {
        const newSpell = await this.spellService.createSpell(spell);
        redirectSpellId = newSpell.id;
      }
    } catch (err) {
      throw err;
    }

    this.saving = false;
    this.formGroup.enable();

    this.router.navigate([
      'campaigns',
      this.campaignService.campaign.id,
      'spells',
      redirectSpellId,
    ]);
  }

  public cancel() {
    this.location.back();
  }

  public async delete() {
    if (
      await this.confirmModal.getConfirmation(
        'Are you sure you want to delete this item? This cannot be undone.'
      )
    ) {
      this.deleting = true;
      try {
        // TODO add back delete
      } catch (err) {
        throw err;
      }

      this.deleting = false;
    }
  }

  public get editing() {
    return this.route.snapshot.data.editing;
  }

  public get name() {
    return this.formGroup.controls.name;
  }

  public get description() {
    return this.formGroup.controls.description;
  }
}
