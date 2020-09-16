
import { StreetModel } from './street.model';
import { PaginationModel } from './page.model';
import { CityModel } from './city.model';

export class StreetWithPaginationModel {
  city: CityModel;
  streets: StreetModel[];
  pagination: PaginationModel;
}
