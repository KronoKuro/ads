
import { EntityState, EntityStore, StoreConfig, Order } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ManagmentCompanyModel } from 'src/app/models/managmentCompany.model';
import { SortPage } from '../../../../models/sortpage.model';

export interface ManagmentCompanyState {
  sortPage: SortPage,
  currentPage: number,
  pageSize: number,
  selectItemsPerPage: number []
}

export function createInitialState(): ManagmentCompanyState {
  return {
    sortPage: { active: 'name', direction: Order.ASC },
    currentPage: 1,
    pageSize: 5,
    selectItemsPerPage: [5, 10, 25, 100]
  };
}

export interface ManagmentCompanyState extends EntityState<ManagmentCompanyModel> { }
@Injectable()
@StoreConfig({ name: 'managmentcompany' })
export class ManagmentCompanyStore extends EntityStore<ManagmentCompanyState, ManagmentCompanyModel> {
  constructor() {
    super(createInitialState());
  }
}

