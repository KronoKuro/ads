import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ManagmentCompanyModel } from 'src/app/models/managmentCompany.model';
import { ManagmentCompanyState, ManagmentCompanyStore } from './managmentcompany.store';

@Injectable()
export class ManagmentCompanyQuery extends QueryEntity<ManagmentCompanyState, ManagmentCompanyModel> {
  constructor(protected store: ManagmentCompanyStore) {
    super(store);
  }
}
