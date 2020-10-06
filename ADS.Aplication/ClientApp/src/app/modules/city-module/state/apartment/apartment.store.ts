
import { EntityState, EntityStore, StoreConfig, Order } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ApartmentModel } from 'src/app/models/apartment.model';
import { SortPage } from '../../../../models/sortpage.model';


export interface ApartmentState {
  sortPage: SortPage,
  currentPage: number,
  pageSize: number,
  selectItemsPerPage: number []
}

export function createInitialState(): ApartmentState {
  return {
    sortPage: { active: 'number', direction: Order.ASC },
    currentPage: 1,
    pageSize: 5,
    selectItemsPerPage: [5, 10, 25, 100]
  };
}

export interface ApartmentState extends EntityState<ApartmentModel> { }
@Injectable()
@StoreConfig({ name: 'apartment' })
export class ApartmentStore extends EntityStore<ApartmentState, ApartmentModel> {
  constructor() {
    super(createInitialState());
  }
}

