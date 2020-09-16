import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CityWithPaginationModel } from "../../../models/citywithpagination.model";
import { CityModel } from "../../../models/city.model";
import { SortPage } from "../../../models/sortpage.model";
import { CitiesStore } from "../state/city.store";
import { tap } from 'rxjs/operators';
import { Sort } from "@angular/material";
import { PaginationService } from "../../shared/services/pagination.service";
import { SortService } from "../../shared/services/sort.service";

@Injectable()
export class CityService {
  private _url: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private cityStore: CitiesStore,
  private paginationService: PaginationService,
  private sortService: SortService
  ) {
    this._url = `${baseUrl}api/city`;
  }

  getCity() {
    //
    return this.http.get<CityWithPaginationModel>(`${this._url}?active=${this.sortService.active}&direction=${this.sortService.direction}&page=${this.paginationService.page}&pageCount=${this.paginationService.pageCount}`).pipe(
      tap(entity => {
        this.cityStore.set(entity.cities);
        this.paginationService.page = entity.pagination.currentPage;
        this.paginationService.pageCount = entity.pagination.pageSize;
        this.paginationService.totalCount = entity.pagination.totalCount;
      }));
  }

  addCity(city: CityModel) {
    return this.http.post(`${this._url}`, city);
  }

  deleteCity(id: string) {
    return this.http.delete(`${this._url}` + '/' + id);
  }

  editCity(city: CityModel) {
    return this.http.put(`${this._url}`, city);
  }


}


