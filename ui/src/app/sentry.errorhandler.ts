import { Injectable, ErrorHandler } from '@angular/core';
import * as Sentry from '@sentry/browser';

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}

  handleError(error) {
    console.log('Handling Error', error);
    Sentry.captureException(error.originalError || error);
  }
}