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

    private refreshInProgress = false;
    private refreshSubject: Subject<boolean> = new Subject<boolean>();

    constructor(private injector: Injector) { }

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
        let authQuery = this.injector.get(AuthorizeQuery);
        var token = authQuery.getValue().access_token;


        if (token) {
            req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
        }
        return of(req);
    }

    private error(req: HttpRequest<any>, res: HttpErrorResponse): Observable<HttpEvent<any>> {
      let authtionService = this.injector.get(AuthorizeService);

        if (res.status === 401) {
            if (!this.refreshInProgress) {
                this.refreshInProgress = true;

                authtionService.refreshLogin()
                    .subscribe(data => {
                        this.refreshInProgress = false;
                        this.refreshSubject.next(true);
                    },
                    refreshLoginError => {
                      authtionService.logout();
                      authtionService.reLogin();
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
