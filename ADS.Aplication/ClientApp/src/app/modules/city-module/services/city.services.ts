import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CityWithPaginationModel } from "../../../models/citywithpagination.model";
import { CityModel } from "../../../models/city.model";
import { SortPage } from "../../../models/sortpage.model";
import { CitiesStore } from "../state/city.store";
import { tap } from 'rxjs/operators';
import { Sort } from "@angular/material";
import { CitiesQuery } from "../state/city.query";

@Injectable()
export class CityService {
  private _url: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string,
  private cityStore: CitiesStore,
  private cityQuery: CitiesQuery
  ) {
    this._url = `${baseUrl}api/city`;
  }

  getCity() {
    const page =  this.cityQuery.getValue().currentPage;
    const pageSize = this.cityQuery.getValue().pageSize;
    const sort = this.cityQuery.getValue().sortPage;

    return this.http.get<CityWithPaginationModel>(`${this._url}?active=${sort.active}&direction=${sort.direction}&page=${page}&pageCount=${pageSize}`).pipe(
      tap(entity => {
        this.cityStore.set(entity.cities);
        this.setPage(entity.pagination);
      }));
  }

  getCityForLookup() {
      let options = { withCredentials: true };
      return this.http.get<CityModel[]>(`${this._url}/lookup`, options).subscribe(list => {
        this.cityStore.update(state => ({
                lookupCity: list
        }));
      });
  }

  setPage(page) {
    this.cityStore.update(({ pagination }) => page);
  }

  setSort(sort) {
    this.cityStore.update(state => ({
      sortPage: sort
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


