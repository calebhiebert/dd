import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dd-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  private openPromise: Promise<void>;

  private resolve: any;

  constructor() {}

  ngOnInit() {}

  public open(): Promise<void> {
    if (this.openPromise !== undefined) {
      throw new Error('Cannot open modal when it is already open');
    }

    this.openPromise = new Promise((resolve, reject) => {
      this.resolve = resolve;
    });

    return this.openPromise;
  }

  public close(): Promise<void> {
    if (this.openPromise === undefined) {
      throw new Error('Cannot close modal when it has not been opened');
    }

    const prom = this.openPromise;

    this.resolve();
    this.openPromise = undefined;
    this.resolve = undefined;

    return prom;
  }

  public get isOpen() {
    return this.openPromise !== undefined;
  }
}
