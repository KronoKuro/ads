
import { CityModel } from './city.model';
import { PaginationModel } from './page.model';

export class CityWithPaginationModel {
  cities: CityModel[];
  pagination: PaginationModel;
}
