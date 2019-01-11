import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationModalComponent } from 'src/app/confirmation-modal/confirmation-modal.component';
import { ItemService, IItem } from 'src/app/item.service';
import { CampaignService } from 'src/app/campaign.service';
import { FormArray } from '@angular/forms';
import { numberValidator } from 'src/app/entity/dynamic-attribute-form/dynamic-attribute-form.component';

@Component({
  selector: 'dd-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css'],
})
export class ItemEditComponent implements OnInit {
  public loading = false;
  public item: IItem;
  public saving = false;
  public deleting = false;

  @ViewChild('confirmmodal')
  public confirmModal: ConfirmationModalComponent;

  public formGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private router: Router,
    private campaignService: CampaignService
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      description: new FormControl(null, Validators.required),
      imageId: new FormControl(this.editing ? null : 'item-default'),
      rarity: new FormControl('0', Validators.required),
      cost: new FormControl(0, [Validators.required, numberValidator]),
      weight: new FormControl(0, [Validators.required, numberValidator]),
      tags: new FormArray([]),
    });

    if (this.editing) {
      this.route.params.subscribe((params) => {
        const id = params.item_id;
        this.loadItem(id);
      });
    }
  }

  public async save() {
    if (!this.formGroup.valid) {
      return;
    }

    this.formGroup.disable();

    this.saving = true;

    const v = this.formGroup.value;

    if (this.editing) {
      const item: IItem = {
        id: this.item.id,
        campaignId: this.item.campaignId,
        name: v.name,
        description: v.description,
        imageId: v.imageId,
        rarity: v.rarity,
        weight: v.weight,
        cost: v.cost,
        tags: v.tags,
      };

      try {
        await this.itemService.updateItem(item);
        this.router.navigate([
          'campaigns',
          this.campaignService.campaign.id,
          'items',
        ]);
      } catch (err) {
        console.log('SAVE ERR', err);
      }
    } else {
      const item: IItem = {
        id: '',
        name: v.name,
        campaignId: this.campaignService.campaign.id,
        description: v.description,
        imageId: v.imageId,
        rarity: v.rarity,
        weight: v.weight,
        cost: v.cost,
        tags: v.tags,
      };

      try {
        const createdItem = await this.itemService.createItem(item);
        this.router.navigate([
          'campaigns',
          this.campaignService.campaign.id,
          'items',
        ]);
      } catch (err) {
        console.log('CREATE ERR', err);
      }
    }

    this.saving = false;
    this.formGroup.enable();
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
        // await this.itemService.deleteItem(this.item.id);
        this.router.navigate(['../..'], { relativeTo: this.route });
      } catch (err) {
        console.log('DEL ERR', err);
      }

      this.deleting = false;
    }
  }

  private async loadItem(id: string) {
    this.loading = true;
    this.item = null;
    this.formGroup.disable();

    try {
      const item = await this.itemService.getItem(id);
      this.item = item;

      this.formGroup.patchValue(item);

      if (this.item.tags) {
        (this.formGroup.get('tags') as FormArray).controls = this.item.tags.map(
          (t) => new FormControl(t)
        );
      }
    } catch (err) {
      console.log('LOAD ERR', err);
    }

    this.formGroup.enable();
    this.loading = false;
  }

  public get editing() {
    return this.route.snapshot.data.editing;
  }
}
