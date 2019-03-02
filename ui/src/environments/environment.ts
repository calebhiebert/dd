// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth0Domain: 'panch-dd.auth0.com',
  auth0ClientId: '9vKGU44oDoiGxliIyFL7hjWQQSdmvWEz',
  apiURL: 'http://localhost:5000/api',
  hubURL: 'http://localhost:5000/hub',
  tileURL: 'http://localhost:5000/api',
  gitHash: 'REPLACE_GIT_HASH',
  gitTag: 'REPLACE_GIT_TAG',
  sentryDSN: 'https://afdf2c17948049938e2f1d3151093cc1@sentry.io/1378358',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
