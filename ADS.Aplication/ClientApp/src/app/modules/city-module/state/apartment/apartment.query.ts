import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ApartmentState, ApartmentStore } from './apartment.store';
import { ApartmentModel } from 'src/app/models/apartment.model';

@Injectable()
export class ApartmentQuery extends QueryEntity<ApartmentState, ApartmentModel> {
  constructor(protected store: ApartmentStore) {
    super(store);
  }
}
