
import { EntityState, EntityStore, StoreConfig, Store } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { TokenModel } from '../../../../models/token.model';
import { User } from 'src/app/models/user.model';
import { Role } from 'src/app/models/role.model';

export interface AuthState {
  token: null,
  newtoken: null,
}
export function createInitialState() :AuthState {
  return {
    token: null,
    newtoken: null,
    //idToken: null,
    //expiresIn: 0,
    //role: null,
    //user: null

  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'authorize' })
export class AuthorizeStore extends Store<AuthState> {
  constructor() {
    super(createInitialState());
  }

}

