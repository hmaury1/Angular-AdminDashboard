import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/internal/operators';
import { AuthGuard } from './auth-guards';
import { AppSettings } from '../models/app-settings';
import { NotificationService } from '../modules/widgets/notification/notification.module';
import { SpinnerService } from '../modules/widgets/spinner/spinner.module';

@Injectable()
export class HttpService implements HttpInterceptor  {

    constructor(private router: Router, private auth: AuthGuard, public notification: NotificationService, public spinner: SpinnerService) {
    }
       /**
   * intercept all XHR request
   * @param request
   * @param next
   * @returns {Observable<A>}
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url !== './assets/config.json'
        && request.url !== AppSettings.API_URL + 'token'
        && sessionStorage.getItem('token')) {
      request = request.clone({
        setHeaders: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ` + sessionStorage.getItem('token')
        }
      });
    }

     /**
     * continues request execution
     */
    return next.handle(request).pipe(catchError((error, caught) => {
        // intercept the respons error and displace it to the console
        console.log(error);
        this.handleAuthError(error);
        return of(error);
      }) as any);
  }


  /**
   * manage errors
   * @param err
   * @returns {any}
   */
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    // handle your auth error or rethrow
    if (err.status === 401) {
      // navigate /delete cookies or whatever
      console.log('handled error ' + err.status);
      this.auth.logout();
      return of(err.message);
    }

    if (err.status === 400) {
      this.spinner.hide();
      // navigate /delete cookies or whatever
      console.log('handled error ' + err.status);
      this.notification.show(err.error);
      return of(err.message);
    }
    throw Error;
  }
}
