import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SortPage } from "../../../models/sortpage.model";
import { tap } from 'rxjs/operators';
import { Sort } from "@angular/material";
import { SortService } from "../../shared/services/sort.service";
import { ManagmentCompanyQuery } from "../state/managmentcompany/managmentcompany.query";
import { EntityWithPaginationViewModel } from "../../../models/EntityWithPaginationViewModel";
import { ManagmentCompanyModel } from "../../../models/managmentCompany.model";
import { ManagmentCompanyStore } from "../state/managmentcompany/managmentcompany.store";


@Injectable()
export class MangmentCompanyService {
  private _url: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string,
  private managmentCompanyStore: ManagmentCompanyStore,
  private managmentCompanyQuery: ManagmentCompanyQuery,
  private sortService: SortService
  ) {
    this._url = `${baseUrl}api/managmentCompany`;
  }

  getManagmentCompanies() {
    let page =  this.managmentCompanyQuery.getValue().currentPage;
    let pageSize = this.managmentCompanyQuery.getValue().pageSize;
    return this.http.get<EntityWithPaginationViewModel<ManagmentCompanyModel>>(`${this._url}?active=${this.sortService.active}&direction=${this.sortService.direction}&page=${page}&pageCount=${pageSize}`).pipe(
      tap(entity => {
        this.managmentCompanyStore.set(entity.entities);
        this.setPage(entity.pagination);
      }));
  }

  setPage(page){
    this.managmentCompanyStore.update(({ pagination }) => page);
  }


  addCompany(company: ManagmentCompanyModel) {
    return this.http.post(`${this._url}`, company);
  }

  deleteCompany(id: string) {
    return this.http.delete(`${this._url}` + '/' + id);
  }

  editCompany(company: ManagmentCompanyModel) {
    return this.http.put(`${this._url}`, company);
  }


}


