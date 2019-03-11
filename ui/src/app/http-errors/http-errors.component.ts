import { Component, OnInit, Input } from '@angular/core';

export enum ErrorType {
  UNKNOWN_ERROR,
  HTTP_404,
}

@Component({
  selector: 'dd-http-errors',
  templateUrl: './http-errors.component.html',
  styleUrls: ['./http-errors.component.css'],
})
export class HttpErrorsComponent implements OnInit {
  @Input()
  public error: any;

  public errType: ErrorType;

  constructor() {}

  ngOnInit() {
    this.parseError(this.error);
  }

  private parseError(err: any) {
    if (err === undefined || err === null) {
      return;
    }

    if (err.status && err.status === 404) {
      this.errType = ErrorType.HTTP_404;
    } else {
      console.log(err);
    }
  }
}
