import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CityService } from '../../services/city.services';
import { CityModel } from '../../../../models/city.model';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { CitiesQuery } from '../../state/city.query';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddCityComponent } from './add-city/add-city.component';
import { DeleteCityComponent } from './delete-city/delete-city.component';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit, OnDestroy {
  cities: CityModel[];
  displayedColumns: string[] = ['name', 'actions'];
  dataSource: any;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  subscription: Subscription;

  constructor(private cityService: CityService, private cityQuery: CitiesQuery, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.subscription =  this.load();
    //this.cityService.getCity().subscribe(res => {
    //   this.cities = this.cityQuery.getAll();
    //   this.dataSource = new MatTableDataSource(this.cities);
    //   this.dataSource.sort = this.sort;
    // });
  }

  load() {
    return this.cityService.getCity().subscribe(res => {
      this.cities = this.cityQuery.getAll();
      this.dataSource = new MatTableDataSource(this.cities);
      this.dataSource.sort = this.sort;
    });
    //this.cityService.getCity();
    //this.cities = this.cityQuery.getAll();
  }

  addCity() {
    const dialogRef = this.dialog.open(AddCityComponent, {});
    this.subscription = dialogRef.afterClosed().subscribe(response => {
      this.load();
    });
  }

  editCity(elem) {
    console.log(elem);
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
        debugger;
        console.log(this.cities);
      }
  }

}
