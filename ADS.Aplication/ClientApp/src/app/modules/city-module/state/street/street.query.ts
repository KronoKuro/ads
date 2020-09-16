import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { StreetModel } from '../../../../models/street.model';
import { StreetsState, StreetsStore } from './street.store';

@Injectable()
export class StreetsQuery extends QueryEntity<StreetsState, StreetModel> {
  constructor(protected store: StreetsStore) {
    super(store);
  }
}
