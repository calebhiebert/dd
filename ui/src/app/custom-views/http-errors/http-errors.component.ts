import { Component, OnInit, Input } from '@angular/core';

export enum ErrorType {
  UNKNOWN_ERROR,
  HTTP_404,
  HTTP_403,
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
    } else if (err.status && err.status === 403) {
      this.errType = ErrorType.HTTP_403;
    } else {
      console.log(err);
    }
  }

  public get title() {
    switch (this.errType) {
      case ErrorType.HTTP_404:
        return '404';
      case ErrorType.HTTP_403:
        return '403';
      case ErrorType.UNKNOWN_ERROR:
        return 'Oh Dear';
      default:
        return '';
    }
  }

  public get text() {
    switch (this.errType) {
      case ErrorType.HTTP_404:
        return 'The thing you are looking for appears to be missing';
      case ErrorType.HTTP_403:
        return 'You\'re not allowed to do whatever it is you are trying to do';
      case ErrorType.UNKNOWN_ERROR:
        return 'Not sure what went wrong here';
      default:
        return '';
    }
  }
}
