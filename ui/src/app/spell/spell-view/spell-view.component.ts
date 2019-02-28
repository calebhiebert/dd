import { Component, OnInit, ViewChild } from '@angular/core';
import { ISpell, SpellService, IEntitySpell } from 'src/app/spell.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from 'src/app/campaign.service';
import { EditableEntitySelectorComponent } from 'src/app/entity/editable-entity-selector/editable-entity-selector.component';
import { IEntity, EntityService } from 'src/app/entity.service';
import * as Sentry from '@sentry/browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'dd-spell-view',
  templateUrl: './spell-view.component.html',
  styleUrls: ['./spell-view.component.css'],
})
export class SpellViewComponent implements OnInit {
  public loading = false;
  public spell: ISpell;

  @ViewChild('entityselect')
  private entitySelect: EditableEntitySelectorComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spellService: SpellService,
    private campaignService: CampaignService,
    private toast: ToastrService,
    private entityService: EntityService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('s_id');

      if (id) {
        this.load(id);
      }
    });
  }

  private async load(id: string) {
    this.loading = true;

    try {
      this.spell = await this.spellService.getSpell(id);
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  public edit() {
    this.router.navigate([
      'campaigns',
      this.campaignService.campaign.id,
      'spells',
      this.spell.id,
      'edit',
    ]);
  }

  public async addToEntitySpells() {
    let entity: IEntity;

    // A filtered list of all entities that support spells
    const spellableEntities = this.campaignService.editableEntities.filter(
      (e) => {
        if (!e.preset) {
          const preset = this.campaignService.getEntityPreset(e.entityPresetId);

          // This would be weird, capture the event
          if (!preset) {
            Sentry.captureEvent({
              message:
                'An entity existed on the campaign, but it did not have the corresponding preset.',
              extra: {
                campaign: this.campaignService.campaign,
              },
            });

            return false;
          }

          e.preset = preset;
        }

        return e.preset.isSpellsetsEnabled;
      }
    );

    // If there is only 1 entity available to add the item to, select it automatically
    if (spellableEntities.length === 1) {
      entity = spellableEntities[0];
    } else {
      // Get entity from list
      entity = await this.entitySelect.selectEntity(spellableEntities);
    }

    // This means that an entity was not selected
    if (entity === null || entity === undefined) {
      return;
    }

    try {
      const entitySpell: IEntitySpell = {
        spellId: this.spell.id,
        entityId: entity.id,
      };

      const createdItem = await this.spellService.updateSpellsetItem(
        entitySpell
      );

      this.toast.info(
        `Added <span class="text-bold">${
          this.spell.name
        }</span> to <span class="text-bold">${entity.name}'s</span> spells`,
        'Spell Added',
        {
          enableHtml: true,
        }
      );
    } catch (err) {
      throw err;
    }
  }

  public get editable() {
    return this.campaignService.canEdit;
  }

  public get canAddToInventory() {
    return this.campaignService.editableEntities.length > 0;
  }
}
