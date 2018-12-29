import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { FormGroup } from '@angular/forms';
import { ItemFormComponent } from '../item-form/item-form.component';

@Component({
  selector: 'dd-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css'],
})
export class ItemEditComponent implements OnInit {
  public loading = false;
  public item: Item = null;
  public saving = false;

  @ViewChild('iform')
  public form: ItemFormComponent;

  public valid = true;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params.item_id;
      this.loadItem(id);
    });
  }

  public async save() {
    if (!this.form || !this.form.formGroup || !this.form.formGroup.valid) {
      return;
    }

    this.form.formGroup.disable();
    this.saving = true;

    try {
      const itm = await this.itemService.saveItem(<Item>(
        this.form.formGroup.value
      ));
      console.log(itm);
    } catch (err) {
      console.log('SAVE ERR', err);
    }

    this.saving = false;
    this.form.formGroup.enable();
  }

  public async delete() {
    if (confirm('Are you sure?')) {
      try {
        await this.itemService.deleteItem(this.item.id);
      } catch (err) {
        console.log('DEL ERR', err);
      }

      this.router.navigate(['../..'], { relativeTo: this.route });
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

    setTimeout(() => {
      this.setupFormListener(this.form.formGroup);
    }, 1);
  }

  private setupFormListener(formGroup: FormGroup) {
    formGroup.valueChanges.subscribe((v) => {
      this.valid = formGroup.valid;
    });
  }
}
