
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { LoginModel } from '../../../../models/login.model';
import { User } from 'src/app/models/user.model';
import { Role } from 'src/app/models/role.model';


export interface AuthorizeState {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  expiresIn: number;
  role: Role;
  user: User;
}

export function createInitialState(): AuthorizeState {
  return {
    accessToken: null,
    idToken: null,
    refreshToken: null,
    expiresIn: 0,
    role: null,
    user: null

  };
}

export interface AuthorizeState extends EntityState<LoginModel> { }
@Injectable()
@StoreConfig({ name: 'authorize' })
export class AuthorizeStore extends EntityStore<AuthorizeState, LoginModel> {
  constructor() {
    super(createInitialState());
  }
}

