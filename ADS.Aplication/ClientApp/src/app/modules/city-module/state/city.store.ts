
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { CityModel } from 'src/app/models/city.model';
import { Injectable } from '@angular/core';

export interface CitiesState extends EntityState<CityModel> { }
@Injectable()
@StoreConfig({ name: 'cities' })
export class CitiesStore extends EntityStore<CitiesState, CityModel> {
  constructor() {
    super();
  }
}

