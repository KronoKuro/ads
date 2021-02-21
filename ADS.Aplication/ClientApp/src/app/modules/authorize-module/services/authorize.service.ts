import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import jwt_decode from "jwt-decode";
import { User } from "../../../models/user.model";
import { AuthorizeStore } from "../state/authorize/authorize.store";
import { AuthorizeQuery } from "../state/authorize/authorize.query";
import {Router} from '@angular/router';
import { map, tap } from "rxjs/operators";
import { LoginModel } from '../../../models/login.model';
import { TokenModel } from '../../../models/token.model';


@Injectable({ providedIn: 'root' })
export class AuthorizeService {
  private _url: string;
  private refreshToken: string;

  constructor(private http: HttpClient,
    private store: AuthorizeStore,
    private query: AuthorizeQuery,
    private route: Router,
    @Inject('BASE_URL') baseUrl: string) {
    this._url = `${baseUrl}api/authorize`;
    this.refreshToken = this.query.getValue().newtoken;
  }

  logIn(model: LoginModel) {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

     const login = new LoginModel(model.userName, model.password, 'password');
    //.set('username', username)
    //.set('password', password)
    //.set('grant_type', 'password');

    return this.http.post<TokenModel>(this._url + '/token', login, { headers: headers });
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
  // return this.logIn(model).pipe(//return this.logIn(model.userName, model.password)
  //   tap(response => {
  //     try {

  //       this.store.update(state => ({
  //         token: response.token,
  //         newtoken: response.newtoken
  //       }));
  //       //this.store.update(entity => { entity.token = response.token });
  //       //this.store.update(entity => { entity.newtoken = response.newtoken });

  //       //this.store.update(({ token }) => response.token);
  //       //this.store.update(({ newtoken }) => response.newtoken);
  //       //this.store.update(({  ...newtoken }) => response.newtoken);
  //           //this.loginResponse(response)
  //     }catch(error) {
  //       console.log(error);
  //     }}));
      return this.logIn(model).pipe(
        tap(resp => {
          try {
            //let decode = jwt_decode<ITokenModel>(resp.token);
            var token = resp.token;
            var newtoken = resp.newtoken;
            this.store.update({ token: resp.token});
            this.store.update({ newtoken: resp.newtoken});
            //.store.update({token});
            //this.store.update({newtoken});
              //state => ({
           //   token: resp.token,
              //newtoken: resp.newtoken
            //})
            //);
          } catch (error) {
            console.log(error);
          }
        }));
}

private loginResponse(response: any) {
  const accessToken = response.token;
  if (accessToken == null) {
    throw new Error('Received accessToken was empty');
  }

  const refreshToken: string = response.newtoken;
  //const decodedIdToken = jwt_decode(response.id_token, { header: true });

  //const roles = Array.isArray(decodedIdToken.role) ? decodedIdToken.role : [decodedIdToken.role];

  const user = <User>{};

  //user.userName = decodedIdToken.name;
  //user.role = decodedIdToken.role;

  //this.store.set(response);

    //this.store.update(state=> { state.token = accessToken });
    //this.store.update(state => { ...state, state.newtoken = refreshToken });
    //this.store.update(({ idToken}) => idToken);

    //this.store.update(({  expiresIn }) => expiresIn);
    //this.store.update(({  role }) => role);
    //this.store.update(({  user }) => user);

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


logout(): void {
  this.store.update(({ token }) => null);
    this.store.update(({  newtoken }) => null);
    //this.store.update(({  role }) => null);
    //this.store.update(({  user }) => null);
}



}


