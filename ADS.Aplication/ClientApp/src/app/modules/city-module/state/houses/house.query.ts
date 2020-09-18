import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { HouseState, HouseStore } from './house.store';
import { HouseModel } from 'src/app/models/house.model';

@Injectable()
export class HousesQuery extends QueryEntity<HouseState, HouseModel> {
  constructor(protected store: HouseStore) {
    super(store);
  }
}
