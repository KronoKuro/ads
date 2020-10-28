import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import jwt_decode from "jwt-decode";
import { User } from "../../../models/user.model";
import { AuthorizeStore } from "../state/authorize/authorize.store";
import { AuthorizeQuery } from "../state/authorize/authorize.query";
import {Router} from '@angular/router';
import { map } from "rxjs/operators";
import { LoginModel } from '../../../models/login.model';


@Injectable()
export class AuthorizeService {
  private _url: string;
  private refreshToken: string;

  constructor(private http: HttpClient,
    private store: AuthorizeStore,
    private query: AuthorizeQuery,
    private route: Router,
    @Inject('BASE_URL') baseUrl: string) {
    this._url = `${baseUrl}api/authorize`;
    this.refreshToken = this.query.getValue().refreshToken;
  }

  logIn(username: string, password: string): Observable<Object> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded');

    const params = new HttpParams()
        .set('username', username)
        .set('password', password)
        .set('grant_type', 'password');

    return this.http.post(this._url + '/token', params, { headers: headers });
}

refreshLogin() {
   return  this.refresh(this.refreshToken).pipe(map(res => this.loginResponse(res)));
}

redirectLogin() {
  this.route.navigate(['/login']);
}

reLogin() {
  this.logout();
  this.redirectLogin();
}

login(model: LoginModel) {
  //if (this.isAuthorized) {
    //this.logout();
  //}
  return this.logIn(model.userName, model.password).pipe(map(response => this.loginResponse(response)));
}

private loginResponse(response: any) {
  const accessToken = response.access_token;
  if (accessToken == null) {
    throw new Error('Received accessToken was empty');
  }

  const idToken: string = response.id_token;
  const refreshToken: string = response.refresh_token;
  const expiresIn: number = response.expires_in;

  const tokenExpiryDate = new Date();
  tokenExpiryDate.setSeconds(tokenExpiryDate.getSeconds() + expiresIn);

  const accessTokenExpiry = tokenExpiryDate;

  const decodedIdToken = jwt_decode(response.id_token, { header: true });

  const roles = Array.isArray(decodedIdToken.role) ? decodedIdToken.role : [decodedIdToken.role];

  const user = <User>{};
  user.id = decodedIdToken.sub;
  user.userName = decodedIdToken.name;
  user.role = decodedIdToken.role;


  this.saveUserDetails(user, roles, accessToken, idToken, refreshToken, accessTokenExpiry);

  return user;
}

refresh(refreshToken: string): Observable<Object> {
   // const headers = new HttpHeaders()
    //    .set('Content-Type', 'application/x-www-form-urlencoded');

    const params = new HttpParams()
        .set('refresh_token', refreshToken)
        .set('grant_type', 'refresh_token');

    return this.http.post(this._url + '/token', params);
}

saveUserDetails(user: User, role: string,
  accessToken: string, idToken: string, refreshToken: string,
  expiresIn: Date) {

    this.store.update(({ accessToken }) => accessToken);
    this.store.update(({ idToken}) => idToken);
    this.store.update(({  refreshToken }) => refreshToken);
    this.store.update(({  expiresIn }) => expiresIn);
    this.store.update(({  role }) => role);
    this.store.update(({  user }) => user);
}

logout(): void {
  this.store.update(({ accessToken }) => null);
    this.store.update(({ idToken}) => null);
    this.store.update(({  refreshToken }) => null);
    this.store.update(({  expiresIn }) => null);
    this.store.update(({  role }) => null);
    this.store.update(({  user }) => null);
}



}


