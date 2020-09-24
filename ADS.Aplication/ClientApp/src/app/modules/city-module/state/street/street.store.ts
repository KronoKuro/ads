
import { EntityState, EntityStore, StoreConfig, Order } from '@datorama/akita';
import { StreetModel } from 'src/app/models/street.model';
import { Injectable } from '@angular/core';
import { SortDirection, MatSort } from '@angular/material';
import { SortPage } from '../../../../models/sortpage.model';

export interface StreetState {
  currentPage: number,
  pageSize: number,
  selectItemsPerPage: number []
}

export function createInitialState(): StreetState {
  return {
    currentPage: 1,
    pageSize: 5,
    selectItemsPerPage: [5, 10, 25, 100]
  };
}

export interface StreetsState extends EntityState<StreetModel> {}
@Injectable()
@StoreConfig({ name: 'streets' })
export class StreetsStore extends EntityStore<StreetsState, StreetModel> {

  constructor() {
    super(createInitialState());
  }
}

