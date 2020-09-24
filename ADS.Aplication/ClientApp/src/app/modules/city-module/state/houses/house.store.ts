
import { EntityState, EntityStore, StoreConfig, Order } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { HouseModel } from 'src/app/models/house.model';
import { SortPage } from '../../../../models/sortpage.model';


export interface HouseState {
  sortPage: SortPage,
  currentPage: number,
  pageSize: number,
  selectItemsPerPage: number []
}

export function createInitialState(): HouseState {
  return {
    lookupCity: [],
    sortPage: { active: 'name', direction: Order.ASC },
    currentPage: 1,
    pageSize: 5,
    selectItemsPerPage: [5, 10, 25, 100]
  };
}

export interface HouseState extends EntityState<HouseModel> { }
@Injectable()
@StoreConfig({ name: 'houses' })
export class HouseStore extends EntityStore<HouseState, HouseModel> {
  constructor() {
    super(createInitialState());
  }
}

