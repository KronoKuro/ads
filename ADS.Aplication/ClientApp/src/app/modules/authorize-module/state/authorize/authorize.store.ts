
import { EntityState, EntityStore, StoreConfig, Store } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { TokenModel } from '../../../../models/token.model';
import { User } from 'src/app/models/user.model';
import { Role } from 'src/app/models/role.model';


export function createInitialState(): TokenModel {
  return {
    token: null,
    newtoken: null,
    //idToken: null,
    //expiresIn: 0,
    //role: null,
    //user: null

  };
}

export interface AuthorizeState extends EntityState<TokenModel> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'authorize' })
export class AuthorizeStore extends EntityStore<AuthorizeState> {
  constructor() {
    super(createInitialState());
  }

  setValue(setToken, refreshToken) {
    this.update(state => ({
      token: setToken,
      newtoken: refreshToken
    }));
  }

}

