import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CityWithPaginationModel } from "../../../models/citywithpagination.model";
import { CityModel } from "../../../models/city.model";
import { SortPage } from "../../../models/sortpage.model";
import { CitiesStore } from "../state/city.store";
import { tap } from 'rxjs/operators';
import { Sort } from "@angular/material";
import { SortService } from "../../shared/services/sort.service";
import { CitiesQuery } from "../state/city.query";

@Injectable()
export class CityService {
  private _url: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private cityStore: CitiesStore,
  private cityQuery: CitiesQuery,
  private sortService: SortService
  ) {
    this._url = `${baseUrl}api/city`;
  }

  getCity() {
    let page =  this.cityQuery.getValue().currentPage;
    let pageSize = this.cityQuery.getValue().pageSize;
    return this.http.get<CityWithPaginationModel>(`${this._url}?active=${this.sortService.active}&direction=${this.sortService.direction}&page=${page}&pageCount=${pageSize}`).pipe(
      tap(entity => {
        this.cityStore.set(entity.cities);
        this.setPage(entity.pagination);
      }));
  }

  setPage(page){
    this.cityStore.update(({ pagination }) => page);
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


