import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationModalComponent } from 'src/app/confirmation-modal/confirmation-modal.component';
import { ItemService, IItem } from 'src/app/item.service';
import { CampaignService } from 'src/app/campaign.service';
import { FormArray } from '@angular/forms';
import { numberValidator } from 'src/app/entity/dynamic-attribute-form/dynamic-attribute-form.component';
import { Location } from '@angular/common';

@Component({
  selector: 'dd-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css'],
})
export class ItemFormComponent implements OnInit {
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
    private campaignService: CampaignService,
    private location: Location
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
      rarity: new FormControl('0', Validators.required),
      playerVisible: new FormControl(true),
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

    if (this.editing === true) {
      const item: IItem = {
        id: this.item.id,
        campaignId: this.item.campaignId,
        playerVisible: v.playerVisible,
        name: v.name,
        description: v.description,
        imageId: v.imageId,
        rarity: v.rarity,
        weight: v.weight,
        userId: this.item.userId,
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
        throw err;
      }
    } else {
      const item: IItem = {
        id: '',
        name: v.name,
        campaignId: this.campaignService.campaign.id,
        description: v.description,
        imageId: v.imageId,
        rarity: v.rarity,
        playerVisible: v.playerVisible,
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
        throw err;
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
        throw err;
      }

      this.deleting = false;
    }
  }

  public cancel() {
    this.location.back();
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
      throw err;
    }

    this.formGroup.enable();
    this.loading = false;
  }

  public get editing() {
    return this.route.snapshot.data.editing;
  }

  public get rarities() {
    return this.campaignService.campaign.itemRarities || [];
  }

  public get name() {
    return this.formGroup.controls.name;
  }

  public get description() {
    return this.formGroup.controls.description;
  }

  public get cost() {
    return this.formGroup.get('cost');
  }

  public get weight() {
    return this.formGroup.get('weight');
  }

  public get rarity() {
    return this.formGroup.get('rarity');
  }
}
