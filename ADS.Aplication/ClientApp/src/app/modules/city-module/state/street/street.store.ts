
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { StreetModel } from 'src/app/models/street.model';
import { Injectable } from '@angular/core';

export interface StreetsState extends EntityState<StreetModel> { }
@Injectable()
@StoreConfig({ name: 'streets' })
export class StreetsStore extends EntityStore<StreetsState, StreetModel> {
  constructor() {
    super();
  }
}

