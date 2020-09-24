
import { EntityState, EntityStore, StoreConfig, Order } from '@datorama/akita';
import { CityModel } from 'src/app/models/city.model';
import { Injectable } from '@angular/core';


export interface CityState {
  lookupCity: CityModel[],
  sortBy: string,
  sortByOrder: Order,
  currentPage: number,
  pageSize: number,
  selectItemsPerPage: number []
}

export function createInitialState(): CityState {
  return {
    lookupCity: [],
    sortBy: 'name',
    sortByOrder: Order.ASC,
    currentPage: 1,
    pageSize: 5,
    selectItemsPerPage: [5, 10, 25, 100]
  };
}

// const initConf = {
//   lookupCity: [],
//   sortBy: 'name',
//   sortByOrder: Order.ASC,
//   currentPage: 1,
//   pageSize: 5,
//   selectItemsPerPage: [5, 10, 25, 100]
// };
export interface CitiesState extends EntityState<CityModel> { }
@Injectable()
@StoreConfig({ name: 'cities' })
export class CitiesStore extends EntityStore<CitiesState, CityModel> {
  constructor() {
    super(createInitialState());
  }
}

