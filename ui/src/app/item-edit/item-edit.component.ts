import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  @ViewChild('iform')
  public form: ItemFormComponent;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params.item_id;
      this.loadItem(id);
    });
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
      console.log(formGroup.valid);
    });
  }
}
