
import { EntityState, EntityStore, StoreConfig, Store } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { TokenModel } from '../../../../models/token.model';
import { User } from 'src/app/models/user.model';
import { Role } from 'src/app/models/role.model';

export function createInitialState() {
  return {
    token: '',
    newtoken: '',
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'authorize' })
export class AuthorizeStore extends Store {
  constructor() {
    super(createInitialState());
  }

}

