import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'dd-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css'],
})
export class ConfirmationModalComponent implements OnInit {
  @ViewChild('modal')
  public modal: ModalComponent<boolean>;

  public title: string;

  public question: string;

  constructor() {}

  ngOnInit() {}

  public async close(): Promise<boolean> {
    return this.modal.close(false);
  }

  public confirm() {
    return this.modal.close(true);
  }

  public deny() {
    return this.modal.close(false);
  }

  public getConfirmation(
    question: string = 'Are you sure?',
    title: string = 'Confirm'
  ): Promise<boolean> {
    this.title = title;
    this.question = question;

    return this.modal.open();
  }
}
