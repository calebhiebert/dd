import { Component, OnInit, Input } from '@angular/core';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'dd-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent<T> implements OnInit {
  @Input()
  public size = 'normal';

  protected openPromise: Promise<T>;

  protected resolve: any;

  constructor() {}

  ngOnInit() {}

  public open(): Promise<T> {
    if (this.openPromise !== undefined) {
      throw new Error('Cannot open modal when it is already open');
    }

    this.openPromise = new Promise((resolve, reject) => {
      this.resolve = resolve;
    });

    return this.openPromise;
  }

  public close(val: T): Promise<T> {
    if (this.openPromise === undefined) {
      throw new Error('Cannot close modal when it has not been opened');
    }

    const prom = this.openPromise;

    this.resolve(val);
    this.openPromise = undefined;
    this.resolve = undefined;

    return prom;
  }

  public get isOpen() {
    return this.openPromise !== undefined;
  }
}
