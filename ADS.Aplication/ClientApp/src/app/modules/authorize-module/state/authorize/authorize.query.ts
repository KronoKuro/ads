import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { AuthorizeState, AuthorizeStore } from './authorize.store';
import { LoginModel } from '../../../../models/login.model';

@Injectable()
export class AuthorizeQuery extends QueryEntity<AuthorizeState, LoginModel> {
  accessToken$ = this.select(state => state.accessToken);
  idToken$ = this.select(state => state.idToken);
  refreshToken$ = this.select(state => state.refreshToken);
  expiresIn$ = this.select(state => state.expiresIn);
  role$ = this.select(state => state.role);
  user$ = this.select(state => state.user);

  constructor(protected store: AuthorizeStore) {
    super(store);
  }
}
