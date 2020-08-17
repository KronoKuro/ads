import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CityService } from '../../services/city.services';
import { CityModel } from '../../../../models/city.model';
import { MatSort, MatTableDataSource, MatDialog, Sort, PageEvent } from '@angular/material';
import { CitiesQuery } from '../../state/city.query';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddCityComponent } from './add-city/add-city.component';
import { DeleteCityComponent } from './delete-city/delete-city.component';
import { SortPage } from '../../../../models/sortpage.model';  //app/models/sortpage.model;
import { PaginationService } from '../../../../modules/shared/services/pagination.service';
import { SortService } from '../../../../modules/shared/services/sort.service';
import { EditCityComponent } from './edit-city/edit-city.component';


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit, OnDestroy {
  cities: CityModel[];
  displayedColumns: string[] = ['name', 'actions'];
  dataSource: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  subscription: Subscription;

  constructor(private cityService: CityService,
    private cityQuery: CitiesQuery,
    private dialog: MatDialog,
    private paginationService: PaginationService,
    private sortService: SortService) {

  }

  ngOnInit() {
    this.sortService.change(this.sort);
    this.subscription = this.load();
  }

  load() {
    return this.cityService.getCity().subscribe(res => {
      this.cities = this.cityQuery.getAll();
      this.dataSource = new MatTableDataSource(this.cities);
    });
  }

  addCity() {
    const dialogRef = this.dialog.open(AddCityComponent, {});
    this.subscription = dialogRef.afterClosed().subscribe(response => {
      this.load();
    });
  }

  sortData(sort: Sort) {
    this.sortService.change(sort);
    this.load();
  }

  switchPage(event: PageEvent) {
    this.paginationService.change(event);
    this.load();
  }

  editCity(elem) {
    const dialogRef = this.dialog.open(EditCityComponent, {
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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
