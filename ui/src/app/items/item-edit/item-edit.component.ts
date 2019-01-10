import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ItemFormComponent } from '../item-form/item-form.component';
import { ConfirmationModalComponent } from 'src/app/confirmation-modal/confirmation-modal.component';
import { ItemService, IItem } from 'src/app/item.service';

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

  @ViewChild('iform')
  public form: ItemFormComponent;

  public formGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.editing) {
      this.route.params.subscribe((params) => {
        const id = params.item_id;
        this.loadItem(id);
      });
    }

    this.formGroup = new FormGroup({});
  }

  public async save() {
    if (!this.form || !this.form.formGroup || !this.form.formGroup.valid) {
      return;
    }

    this.form.formGroup.disable();
    this.saving = true;

    try {
      await this.itemService.updateItem(<IItem>this.form.formGroup.value);
    } catch (err) {
      console.log('SAVE ERR', err);
    }

    this.saving = false;
    this.form.formGroup.enable();
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

    try {
      const item = await this.itemService.getItem(id);
      this.item = item;
    } catch (err) {
      console.log('LOAD ERR', err);
    }

    this.loading = false;
  }

  public get editing() {
    return this.route.snapshot.data.editing;
  }
}
