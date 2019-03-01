import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IEntitySpell, SpellService, ISpell } from 'src/app/spell.service';
import { CampaignService } from 'src/app/campaign.service';
import { ModalComponent } from 'src/app/modal/modal.component';
import Swal from 'sweetalert2';
import { FormGroup, FormControl } from '@angular/forms';

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
  public editingSpell: IEntitySpell;
  public editFormGroup: FormGroup;
  public saving = false;

  // The ID of the entitySpell currently being deleted (if any)
  public deletingId: string;

  @ViewChild('spellselect')
  private selectModal: ModalComponent<void>;

  @ViewChild('spelledit')
  private editModal: ModalComponent<any>;

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
    if (
      (await Swal.fire({ title: 'Are you sure?', showCancelButton: true }))
        .value === true
    ) {
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

  public async save() {
    if (!this.editingSpell || !this.editFormGroup) {
      return;
    }

    this.saving = true;

    this.editingSpell.content = this.editFormGroup.value.content;

    try {
      await this.spellService.updateSpellsetItem(this.editingSpell);
    } catch (err) {
      throw err;
    }

    this.saving = false;

    try {
      this.editModal.close(null);
    } catch (err) {
      // Ignore
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

  public viewOrEditEntitySpell(es: IEntitySpell) {
    this.editFormGroup = new FormGroup({
      content: new FormControl(es.content),
    });

    this.editingSpell = es;

    this.editModal.open().then(() => {
      this.editingSpell = undefined;
      this.editFormGroup = undefined;
    });
  }

  public get campaign() {
    return this.campaignService.campaign;
  }
}
