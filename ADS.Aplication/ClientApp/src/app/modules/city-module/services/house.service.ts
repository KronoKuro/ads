import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from 'rxjs/operators';
import { EntitiesWithPagination } from '../../../models/EntitiesWithPagination.model';
import { HouseModel } from '../../../models/house.model';
import { StreetModel } from '../../../models/street.model';
import { HouseStore } from '../state/houses/house.store';

@Injectable()
export class HouseService {
  private _url: string;
  constructor(private http: HttpClient,
  @Inject('BASE_URL') baseUrl: string,
  private houseStore: HouseStore
  ) {
    this._url = `${baseUrl}api/house`;
  }

  getHouses(streetId: string) {
    const page =  this.houseStore.getValue().currentPage;
    const pageSize = this.houseStore.getValue().pageSize;
    const sort = this.houseStore.getValue().sortPage;

    return this.http.get<EntitiesWithPagination<StreetModel, HouseModel>>(`${this._url}?streetId=${streetId}&active=${sort.active}&direction=${sort.direction}&page=${page}&pageCount=${pageSize}`).pipe(
      tap(entity => {
        this.houseStore.set(entity.relationEntities);
        this.setPage(entity.pagination);
      }));
  }

  setPage(page) {
    this.houseStore.update(({ pagination }) => page);
  }

  setSort(sort) {
    this.houseStore.update(state => ({
      sortPage: sort
    }));
  }

  addHouse(house: HouseModel) {
    return this.http.post(`${this._url}`, house);
  }

  deleteHouse(id: string) {
    return this.http.delete(`${this._url}` + '/' + id);
  }

  editHouse(house: HouseModel) {
    return this.http.put(`${this._url}`, house);
  }


}


