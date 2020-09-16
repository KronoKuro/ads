import { StreetModel }  from './street.model';

export class HouseModel {
  id: string;
  name: string;
  longitude: string;
  latitude: string;
  managmentCompanyId: string;
  streetId: string;
  street: StreetModel;
  //public virtual ManagmentCompany ManagmentCompany { get; set; }
  //public virtual ICollection<Apartment> Apartments { get; set; }
}
