import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CityService } from '../../services/city.services';
import { CityModel } from '../../../../models/city.model';
import { MatSort, MatTableDataSource, MatDialog, Sort, PageEvent } from '@angular/material';
import { CitiesQuery } from '../../state/city.query';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddCityComponent } from './add-city/add-city.component';
import { DeleteCityComponent } from './delete-city/delete-city.component';
import { EditCityComponent } from './edit-city/edit-city.component';
import { BaseComponent } from '../../../../modules/shared/components/base.component';
import { PaginationModel } from '../../../../models/page.model';
import { StreetsQuery } from '../../state/street/street.query';


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent extends BaseComponent implements OnInit {
  cities: CityModel[];
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource: any;
  pagination: PaginationModel = new PaginationModel();
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private cityService: CityService,
    private cityQuery: CitiesQuery,
    dialog: MatDialog,
    private citiesQuery: CitiesQuery) {
      super(null, dialog);

  }

  ngOnInit() {
    this.subscription = this.load();
  }

  load() {
    return this.cityService.getCity().subscribe(res => {
      this.cities = this.cityQuery.getAll();
      this.pagination.currentPage =  this.citiesQuery.getValue().currentPage;
      this.pagination.pageSize = this.citiesQuery.getValue().pageSize;
      this.pagination.totalCount = this.citiesQuery.getValue().totalCount;
      this.pagination.selectItemsPerPage = this.citiesQuery.getValue().selectItemsPerPage;
      this.dataSource = new MatTableDataSource(this.cities);
    });
  }

  addCity() {
    const dialogRef = this.dialog.open(AddCityComponent, {
      height: '350px',
      width: '500px',
    });
    this.subscription = dialogRef.afterClosed().subscribe(response => {
      this.load();
    });
  }

  sortData(sort: Sort) {
    this.cityService.setSort(sort);
    this.load();
  }

  switchPage(event: PageEvent) {
    this.changePage(event);
    this.cityService.setPage(this.pagination);
    this.load();
  }

  editCity(elem: CityModel) {
    const dialogRef = this.dialog.open(EditCityComponent, {
      height: '350px',
      width: '500px',
      data: { city: elem }
    });
    this.subscription = dialogRef.afterClosed().subscribe(response => {
      this.load();
    });
  }

  deleteCity(elem) {
    const dialogRef = this.dialog.open(DeleteCityComponent, {
      data: { city: elem }
    });
    this.subscription = dialogRef.afterClosed().subscribe(response => {
      this.load();
    });
  }

}
