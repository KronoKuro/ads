import { StreetModel }  from './street.model';
import { ManagmentCompanyModel } from './managmentCompany.model';

export class HouseModel {
  id: string;
  name: string;
  longitude: string;
  latitude: string;
  managmentCompanyId: string;
  managmentCompanyName: string;
  streetId: string;
  street: StreetModel;
  //public virtual ICollection<Apartment> Apartments { get; set; }
}
