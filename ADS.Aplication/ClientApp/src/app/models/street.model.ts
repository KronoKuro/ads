import { HouseModel } from './house.model';
import { CityModel } from './city.model';

export class StreetModel {
  id: string;
  name: string;
  cityId: string;
  city: CityModel;
  houses: HouseModel[];
}
