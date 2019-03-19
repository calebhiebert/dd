import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as Sentry from '@sentry/browser';

if (environment.production) {
  enableProdMode();

  Sentry.init({
    dsn: environment.sentryDSN,
    enabled: environment.production,
    environment: environment.production ? 'Production' : 'Development',
    release: 'REPLACE_GIT_HASH',
  });
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
