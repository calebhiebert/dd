import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'dd-inventory-selector',
  templateUrl: './inventory-selector.component.html',
  styleUrls: ['./inventory-selector.component.css'],
})
export class InventorySelectorComponent implements OnInit, AfterContentInit {
  @ViewChild('itemselector')
  public itemSelector: ModalComponent;

  constructor() {}

  ngOnInit() {}

  ngAfterContentInit(): void {
    this.itemSelector.open().then(() => console.log('modal closed'));
  }
}
