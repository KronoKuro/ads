
import { Injectable, Inject } from "@angular/core";
import { PageEvent } from '@angular/material/paginator';
import { PaginationModel } from "../../../models/page.model";

@Injectable()
export class PaginationService {
    array: number[] = [5, 10, 20];
    private paginationModel: PaginationModel;
    constructor() {
      this.paginationModel = new PaginationModel();
    }

    get totalCount(): number {
      return this.paginationModel.totalCount? this.paginationModel.totalCount : 0;
    }

    get page(): number {
        return this.paginationModel.currentPage? this.paginationModel.currentPage : 1;
    }

    get selectItemsPerPage(): number[] {
        return this.array;
    }
    get pageCount(): number {
        return this.paginationModel.pageSize? this.paginationModel.pageSize : 5;
    }

    set  totalCount(value: number) {
       this.paginationModel.totalCount = value;
    }

    set page(value: number) {
       this.paginationModel.currentPage = value;
    }

    set pageCount(value: number) {
        this.paginationModel.pageSize = value;
    }

    change(pageEvent: PageEvent) {
        this.paginationModel.currentPage = pageEvent.pageIndex + 1;
        this.paginationModel.pageSize = pageEvent.pageSize;
        this.paginationModel.totalCount = pageEvent.length;
    }
}
