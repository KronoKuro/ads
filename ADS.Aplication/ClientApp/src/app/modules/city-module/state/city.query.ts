import { QueryEntity } from '@datorama/akita';
import { CitiesStore, CitiesState } from './city.store';
import { Injectable } from '@angular/core';
import { CityModel } from '../../../models/city.model';

@Injectable()
export class CitiesQuery extends QueryEntity<CitiesState, CityModel> {
  constructor(protected store: CitiesStore) {
    super(store);
  }
}
