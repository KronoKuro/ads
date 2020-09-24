
import { EntityState, EntityStore, StoreConfig, Order } from '@datorama/akita';
import { CityModel } from 'src/app/models/city.model';
import { Injectable } from '@angular/core';
import { SortPage } from '../../../models/sortpage.model';

export interface CityState {
  lookupCity: CityModel[],
  sortPage: SortPage,
  currentPage: number,
  pageSize: number,
  selectItemsPerPage: number []
}

export function createInitialState(): CityState {
  return {
    lookupCity: [],
    sortPage: { active: 'name', direction: Order.ASC },
    currentPage: 1,
    pageSize: 5,
    selectItemsPerPage: [5, 10, 25, 100]
  };
}

export interface CitiesState extends EntityState<CityModel> { }
@Injectable()
@StoreConfig({ name: 'cities' })
export class CitiesStore extends EntityStore<CitiesState, CityModel> {
  constructor() {
    super(createInitialState());
  }
}

