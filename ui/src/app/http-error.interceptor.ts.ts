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

                await this.router.navigate(['login']);
                break;
              case 0:
                await Swal.fire({
                  title: "Can't Connect!",
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
        }
      })
    );
  }
}