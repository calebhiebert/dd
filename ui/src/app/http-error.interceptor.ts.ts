import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap, finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private silenceErrors = false;

  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let responseError;

    return next.handle(req).pipe(
      tap(() => {}, (error) => (responseError = error)),
      finalize(async () => {
        if (responseError !== undefined) {
          if (this.silenceErrors) {
            return;
          }

          if (responseError instanceof HttpErrorResponse) {
            switch (responseError.status) {
              case 401:
                await Swal.fire({
                  title: 'Session Expired',
                  text:
                    'Your login session has expired, you will be redirected to the login page',
                  type: 'warning',
                  confirmButtonText: 'Okay',
                });

                this.silenceErrors = true;

                await this.router.navigate(['login']);
                break;
              case 404:
                if (req.url.indexOf('/users/') !== -1) {
                } else {
                  await Swal.fire({
                    title: 'Not Found',
                    text:
                      'The resource you requested could not be found! Sorry about that.',
                    type: 'error',
                    confirmButtonText: 'Okay',
                  });
                }
                break;
              case 400:
                this.handleBadRequest(responseError);
                break;
              case 403:
                await Swal.fire({
                  title: 'No Permissions',
                  text: "Looks like you don't have permission for that!",
                  type: 'error',
                  confirmButtonText: 'Shucks',
                });
                break;
              case 0:
                await Swal.fire({
                  title: 'Could Not Connect',
                  text:
                    'A connection to the server could not be established. Please make sure you are connected to the internet',
                  type: 'error',
                  confirmButtonText: 'Okay',
                });
                break;
              default:
                await Swal.fire({
                  title: 'Unknown Error!',
                  text:
                    'An unknown error occured. Maybe this will help: ' +
                    responseError.message,
                  type: 'error',
                  confirmButtonText: 'Okay',
                });
                break;
            }
          } else {
            console.log('UNKNOWN ERR', responseError);
          }
        } else {
          this.silenceErrors = false;
        }
      })
    );
  }

  private handleBadRequest(err: HttpErrorResponse) {
    const error = err.error;
    const errorTitle = 'Oh Dear';
    let errorText = error;
    const swalType = 'error';

    switch (error) {
      case 'already in campaign':
        errorText = 'You are already a member of this campaign!';
        break;
    }

    Swal.fire({
      type: swalType,
      confirmButtonText: '¯\\_(ツ)_/¯',
      title: errorTitle,
      text: errorText,
    });
  }
}
