import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SortPage } from "../../../models/sortpage.model";
import { StreetsStore } from '../state/street/street.store';
import { tap } from 'rxjs/operators';
import { Sort } from "@angular/material";
import { PaginationService } from "../../shared/services/pagination.service";
import { SortService } from "../../shared/services/sort.service";
import { StreetWithPaginationModel } from "src/app/models/streetwithpagination.model copy";
import { EntitiesWithPagination } from "src/app/models/EntitiesWithPagination.model copy 2";
import { HouseModel } from "src/app/models/house.model";
import { StreetModel } from "src/app/models/street.model";
import { HouseStore } from "../state/houses/house.store";

@Injectable()
export class HouseService {
  private _url: string;
  constructor(private http: HttpClient,
  @Inject('BASE_URL') baseUrl: string,
  private houseStore: HouseStore,
  private paginationService: PaginationService,
  private sortService: SortService
  ) {
    this._url = `${baseUrl}api/house`;
  }

  getHouses(streetId: string) {
    //
    return this.http.get<EntitiesWithPagination<StreetModel, HouseModel>>(`${this._url}?streetId=${streetId}&&active=${this.sortService.active}&direction=${this.sortService.direction}&page=${this.paginationService.page}&pageCount=${this.paginationService.pageCount}`).pipe(
      tap(entity => {
        this.houseStore.set(entity.relationEntities);
        this.setPage(entity.pagination);
      }));
  }

  setPage(page) {
    this.houseStore.update(({ pagination }) => page);
  }

  addHouse(house: HouseModel) {
    return this.http.post(`${this._url}`, house);
  }

  deleteStreet(id: string) {
    return this.http.delete(`${this._url}` + '/' + id);
  }

  editStreet(street: StreetModel) {
    return this.http.put(`${this._url}`, street);
  }


}


