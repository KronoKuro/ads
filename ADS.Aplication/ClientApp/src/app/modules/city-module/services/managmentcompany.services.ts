import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SortPage } from "../../../models/sortpage.model";
import { tap } from 'rxjs/operators';
import { Sort } from "@angular/material";
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
  ) {
    this._url = `${baseUrl}api/managmentCompany`;
  }

  getManagmentCompanies() {
    const page =  this.managmentCompanyQuery.getValue().currentPage;
    const pageSize = this.managmentCompanyQuery.getValue().pageSize;
    const sort = this.managmentCompanyQuery.getValue().sortPage;

    return this.http.get<EntityWithPaginationViewModel<ManagmentCompanyModel>>(`${this._url}?active=${sort.active}&direction=${sort.direction}&page=${page}&pageCount=${pageSize}`).pipe(
      tap(entity => {
        this.managmentCompanyStore.set(entity.entities);
        this.setPage(entity.pagination);
      }));
  }

  setPage(page){
    this.managmentCompanyStore.update(({ pagination }) => page);
  }

  setSort(sort) {
    this.managmentCompanyStore.update(state => ({
      sortPage: sort
    }));
  }

  getCompaniesForLookup() {
    return this.http.get<ManagmentCompanyModel[]>(`${this._url}/lookup`).subscribe(res => {
      this.managmentCompanyStore.update(state => ({
             companiesForLookup : res
      }));
    });
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


