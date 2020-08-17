
import { Injectable, Inject } from "@angular/core";
import { PageEvent } from '@angular/material/paginator';
import { PaginationModel } from "../../../models/page.model";
import { Sort, MatSort } from "@angular/material";
import { SortPage } from "../../../models/sortpage.model";

@Injectable()
export class SortService {

  private sortModel: MatSort;
  constructor() {
    this.sortModel = new MatSort();
  }

  set active(active: string) {
    this.sortModel.active = active;
  }

  set direction(direction) {
    this.sortModel.direction = direction;
  }

  get active(): string {
    return this.sortModel.active? this.sortModel.active : 'Name';
  }

  get direction() {
    return this.sortModel.direction? this.sortModel.direction : 'asc';
  }

  change(sort: Sort) {
    this.sortModel.active = sort.active;
    this.sortModel.direction = sort.direction;
  }
}
