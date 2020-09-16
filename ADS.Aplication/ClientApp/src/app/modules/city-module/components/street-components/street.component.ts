import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { StreetService } from '../../services/street.services';
import { StreetModel } from '../../../../models/street.model';
import { MatSort, MatTableDataSource, MatDialog, Sort, PageEvent } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationService } from '../../../../modules/shared/services/pagination.service';
import { SortService } from '../../../../modules/shared/services/sort.service';
import { BaseComponent } from '../../../shared/components/base.component';
import { StreetsQuery } from '../../state/street/street.query';
import { ActivatedRoute } from '@angular/router';
import { CityModel } from 'src/app/models/city.model';


@Component({
  selector: 'app-street',
  templateUrl: './street.component.html',
  styleUrls: ['./street.component.css']
})
export class StreetComponent extends BaseComponent implements OnInit {
  streets: StreetModel[];
  city: CityModel;
  displayedColumns: string[] = ['name', 'actions'];
  dataSource: any;
  cityId: string;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  subscription: Subscription;

  constructor(private streetService: StreetService,
    private streetQuery: StreetsQuery,
    dialog: MatDialog,
    private route: ActivatedRoute,
    private paginationService: PaginationService,
    private sortService: SortService) {
      super(null, dialog);
      this.cityId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.sortService.change(this.sort);
    this.subscription = this.load();
  }

  load() {
    return this.streetService.getStreets(this.cityId).subscribe(res => {
      this.city = res.city;
      this.streets = this.streetQuery.getAll();
      this.dataSource = new MatTableDataSource(this.streets);
    });
  }

  // addStreet() {
  //   const dialogRef = this.dialog.open(AddCityComponent, {
  //     height: '200px',
  //     width: '500px',
  //   });
  //   this.subscription = dialogRef.afterClosed().subscribe(response => {
  //     this.load();
  //   });
  // }

  sortData(sort: Sort) {
    this.sortService.change(sort);
    this.load();
  }

  switchPage(event: PageEvent) {
    this.paginationService.change(event);
    this.load();
  }

  // editCity(elem: CityModel) {
  //   const dialogRef = this.dialog.open(EditCityComponent, {
  //     height: '200px',
  //     width: '500px',
  //     data: { city: elem }
  //   });
  //   this.subscription = dialogRef.afterClosed().subscribe(response => {
  //     this.load();
  //   });
  // }

  // deleteCity(elem) {
  //   const dialogRef = this.dialog.open(DeleteCityComponent, {
  //     data: { city: elem }
  //   });
  //   this.subscription = dialogRef.afterClosed().subscribe(response => {
  //     this.load();
  //   });
  // }

}
