import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SortPage } from "../../../models/sortpage.model";
import { StreetsStore } from '../state/street/street.store';
import { tap } from 'rxjs/operators';
import { Sort } from "@angular/material";
import { PaginationService } from "../../shared/services/pagination.service";
import { SortService } from "../../shared/services/sort.service";
import { StreetWithPaginationModel } from "src/app/models/streetwithpagination.model copy";
import { StreetModel } from "src/app/models/street.model";
import { PaginationModel } from "src/app/models/page.model";
import { StreetsQuery } from "../state/street/street.query";

@Injectable()
export class StreetService {
  private _url: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private streetsStore: StreetsStore,
  private paginationService: PaginationService,
  private sortService: SortService,
  private streetQuery : StreetsQuery
  ) {
    this._url = `${baseUrl}api/street`;
  }

  getStreets(id: string) {
    let page =  this.streetQuery.getValue().currentPage;
    let pageSize = this.streetQuery.getValue().pageSize;

    return this.http.get<StreetWithPaginationModel>(`${this._url}?id=${id}&active=${this.sortService.active}&direction=${this.sortService.direction}&page=${page}&pageCount=${pageSize}`).pipe(
      tap(entity => {
        this.streetsStore.set(entity.streets);
        this.setPage(entity.pagination);
      }));
  }

  setPage(page){
    this.streetsStore.update(({ pagination }) => page);
  }

  addStreet(street: StreetModel) {
    return this.http.post(`${this._url}`, street);
  }

  deleteStreet(id: string) {
    return this.http.delete(`${this._url}` + '/' + id);
  }

  editStreet(street: StreetModel) {
    return this.http.put(`${this._url}`, street);
  }


}


