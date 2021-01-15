import { QueryEntity ,Query } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { AuthorizeState, AuthorizeStore } from './authorize.store';
import { TokenModel } from '../../../../models/token.model';

@Injectable()
export class AuthorizeQuery extends QueryEntity<AuthorizeState> {
  //token$ = this.select(state => state.token);
  token$ = this.select(state => state.token);
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
