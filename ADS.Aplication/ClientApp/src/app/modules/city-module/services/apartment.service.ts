import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from 'rxjs/operators';
import { ApartmentModel } from '../../../models/apartment.model';
import { ApartmentStore } from '../state/apartment/apartment.store';
import { EntitiesWithPagination } from '../../..//models/EntitiesWithPagination.model';
import { HouseModel } from "../../../models/house.model";

@Injectable()
export class ApartmentService {
  private _url: string;
  constructor(private http: HttpClient,
  @Inject('BASE_URL') baseUrl: string,
  private apartmentStore: ApartmentStore
  ) {
    this._url = `${baseUrl}api/apartment`;
  }

  getApartments(houseId: string) {
    const page =  this.apartmentStore.getValue().currentPage;
    const pageSize = this.apartmentStore.getValue().pageSize;
    const sort = this.apartmentStore.getValue().sortPage;

    return this.http.get<EntitiesWithPagination<HouseModel,ApartmentModel>>(`${this._url}?houseId=${houseId}&active=${sort.active}&direction=${sort.direction}&page=${page}&pageCount=${pageSize}`).pipe(
      tap(entity => {
        this.apartmentStore.set(entity.relationEntities);
        this.setPage(entity.pagination);
      }));
  }

  setPage(page) {
    this.apartmentStore.update(({ pagination }) => page);
  }

  setSort(sort) {
    this.apartmentStore.update(state => ({
      sortPage: sort
    }));
  }

  addApartment(apartment: ApartmentModel) {
    return this.http.post(`${this._url}`, apartment);
  }

  deleteApartment(id: string) {
    return this.http.delete(`${this._url}` + '/' + id);
  }

  editApartment(apartment: ApartmentModel) {
    return this.http.put(`${this._url}`, apartment);
  }


}


