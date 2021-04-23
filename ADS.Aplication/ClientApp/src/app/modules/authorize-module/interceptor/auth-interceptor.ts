import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
//import { _throw } from 'rxjs/observable/throw';
//import { of } from 'rxjs/observable/of';
//mport { Subject } from 'rxjs/Subject';
import { catchError, switchMap, first } from 'rxjs/operators';
import { AuthorizeQuery } from '../state/authorize/authorize.query';
import { AuthorizeService } from '../services/authorize.service';
import { Subject, Observable, of, throwError } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    isLoggedIn = false;
    private refreshInProgress = false;
    _accessToken = null;
    private _loggedIn = false;
    private refreshSubject: Subject<boolean> = new Subject<boolean>();

    constructor(
      protected service: AuthorizeService,
      protected injector: Injector) {
     }

    intercept(original: HttpRequest<any>, delegate: HttpHandler): Observable<HttpEvent<any>> {
        const clone: HttpRequest<any> = original.clone();

        if (clone.url.toLowerCase().includes('/token')) {
            return delegate.handle(clone);
        }

        return this.request(clone).pipe(
            switchMap((req: HttpRequest<any>) => delegate.handle(req)),
            catchError((error: HttpErrorResponse) => this.error(clone, error))
        );
    }

    private request(req: HttpRequest<any>): Observable<HttpRequest<any> | HttpEvent<any>> {
        if (this.refreshInProgress) {
            return this.delayRequest(req);
        }
        return this.Token(req);
    }

    private Token(req: HttpRequest<any>): Observable<HttpRequest<any>> {
        //let authQuery = this.injector.get(AuthorizeQuery);
        //var token = null;
        //authQuery $.subscribe(res => { token = res });
        var token = this.service.getToken();
        this._loggedIn = this.service.isLogIn();
      //this.query.token$.subscribe(token => this._accessToken = token);
         //this.query.isLoggedIn$.subscribe(res => this._loggedIn = res);
         console.log(token + ' access');


         console.log(this._loggedIn);
        if (this._loggedIn) {
            req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token ) });
        }
        return of(req);
    }

    private error(req: HttpRequest<any>, res: HttpErrorResponse): Observable<HttpEvent<any>> {


        if (res.status === 401) {
            if (!this.refreshInProgress) {
                this.refreshInProgress = true;

                this.service.refreshLogin()
                    .subscribe(data => {
                        this.refreshInProgress = false;
                        this.refreshSubject.next(true);
                    },
                    refreshLoginError => {
                      this.service.logout();
                      this.service.reLogin();
                        this.refreshInProgress = false;
                        this.refreshSubject.next(false);
                    });
            }

            if (this.refreshInProgress) {
                return this.delayRequest(req, res);
            }
        }

        return throwError(res);
    }

    private delayRequest(req: HttpRequest<any>, res?: HttpErrorResponse) {
        const http: HttpClient = this.injector.get<HttpClient>(HttpClient);

        return this.refreshSubject.pipe(
            first(),
            switchMap((status: boolean) => {
                return status ? http.request(req) : throwError('session expired');
            })
        );
    }

}
