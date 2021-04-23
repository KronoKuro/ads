import { QueryEntity ,Query } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { AuthorizeStore } from './authorize.store';
import { TokenModel } from '../../../../models/token.model';

interface AuthState {
  token: string,
  newtoken: string,
}

@Injectable({providedIn: 'root'})
export class AuthorizeQuery extends Query<AuthState> {
  token$ = this.select(state => state.token);
  isLoggedIn$ = this.select(state => !!state.token);
  //idToken$ = this.select(state => state.idToken);
  //newtoken$ = this.select(state => state.newtoken);
  //expiresIn$ = this.select(state => state.expiresIn);
  //role$ = this.select(state => state.role);
  //user$ = this.select(state => state.user);

  constructor(protected store: AuthorizeStore) {
    super(store);
  }


  get isLoggedIn() {
    return !!this.getValue().token;
  }
}
