
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { HouseModel } from 'src/app/models/house.model';

export interface HouseState extends EntityState<HouseModel> { }
@Injectable()
@StoreConfig({ name: 'houses' })
export class HouseStore extends EntityStore<HouseState, HouseModel> {
  constructor() {
    super();
  }
}

