import { HouseModel } from './house.model';
import { CityModel } from './city.model';

export class StreetModel {
  id: string;
  name: string;
  cityId: CityModel;
  houses: HouseModel[];
}
