import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IEntitySpell, SpellService, ISpell } from 'src/app/spell.service';
import { CampaignService } from 'src/app/campaign.service';
import { SpellSelectComponent } from '../spell-select/spell-select.component';
import { ModalComponent } from 'src/app/modal/modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'dd-spellset-manager',
  templateUrl: './spellset-manager.component.html',
  styleUrls: ['./spellset-manager.component.css'],
})
export class SpellsetManagerComponent implements OnInit {
  @Input()
  public editable = false;

  @Input()
  public entityId: string;

  public loading = false;
  public spells: IEntitySpell[];

  // The ID of the entitySpell currently being deleted (if any)
  public deletingId: string;

  @ViewChild('spellselect')
  private selectModal: ModalComponent<void>;

  constructor(
    private spellService: SpellService,
    private campaignService: CampaignService
  ) {}

  ngOnInit() {
    if (this.entityId === undefined) {
      throw new Error('Missing entity id');
    }

    this.load();
  }

  private async load() {
    this.loading = true;

    try {
      this.spells = await this.spellService.getSpellset(this.entityId);
    } catch (err) {
      throw err;
    }

    this.loading = false;
  }

  public async remove(entitySpell: IEntitySpell) {
    if (await Swal.fire({ title: 'Are you sure?', showCancelButton: true })) {
      try {
        await this.spellService.deleteSpellsetItem(
          entitySpell.entityId,
          entitySpell.spellId
        );
        this.spells = this.spells.filter((s) => s !== entitySpell);
      } catch (err) {
        throw err;
      }
    }
  }

  public async addSpell(spell: ISpell) {
    try {
      const updatedItem = await this.spellService.updateSpellsetItem({
        entityId: this.entityId,
        spellId: spell.id,
      });

      this.spells.push(updatedItem);

      this.selectModal.close(null);
    } catch (err) {
      throw err;
    }
  }

  public get campaign() {
    return this.campaignService.campaign;
  }
}
