import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { CityService } from '../../services/city.services';
import { CityModel } from '../../../../models/city.model';
import { MatSort, MatTableDataSource, MatDialog, Sort, PageEvent } from '@angular/material';
import { CitiesQuery } from '../../state/city.query';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { SortPage } from '../../../../models/sortpage.model';  //app/models/sortpage.model;
import { PaginationService } from '../../../../modules/shared/services/pagination.service';
import { SortService } from '../../../../modules/shared/services/sort.service';
import { BaseComponent } from 'src/app/modules/shared/components/base.component';
import { StreetModel } from 'src/app/models/street.model';
import { HousesQuery } from '../../state/houses/house.query';
import { HouseModel } from 'src/app/models/house.model';
import { HouseService } from '../../services/house.service';
import { AddHouseComponent } from './add-house/add-house.component';
import { EditHouseComponent } from './edit-house/edit-house.component';
import { DeleteHouseComponent } from './delete-house/delete-house.component';


@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent extends BaseComponent implements OnInit {
  streetModel: StreetModel;
  houses: HouseModel[];
  displayedColumns: string[] = ['id', 'name', 'managmentCompany', 'latitude', 'longitude', 'actions'];
  dataSource: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() set street(street: StreetModel) {
    this.streetModel = street;
    this.sortService.change(this.sort);
    this.subscription = this.load(street.id);
  }

  constructor(private houseService: HouseService,
    private houseQuery: HousesQuery,
    dialog: MatDialog,
    private paginationService: PaginationService,
    private sortService: SortService) {
      super(null, dialog);
  }

  ngOnInit() {

  }

  load(id: string) {
    return this.houseService.getHouses(id).subscribe(res => {
      this.houses = this.houseQuery.getAll();
      this.dataSource = new MatTableDataSource(this.houses);
    });
  }

  addHouse() {
    const dialogRef = this.dialog.open(AddHouseComponent, {
      data: { street: this.streetModel },
      height: '390px',
      width: '500px',
    });
    this.subscription = dialogRef.afterClosed().subscribe(response => {
      this.load(this.streetModel.id);
    });
  }

  sortData(sort: Sort) {
    this.sortService.change(sort);
    this.load(this.streetModel.id);
  }

  switchPage(event: PageEvent) {
    this.paginationService.change(event);
    this.load(this.streetModel.id);
  }

  editHouse(elem: HouseModel) {
    const dialogRef = this.dialog.open(EditHouseComponent, {
      height: '390px',
      width: '500px',
      data: { house: elem }
    });
    this.subscription = dialogRef.afterClosed().subscribe(response => {
      this.load(this.streetModel.id);
    });
  }

  deleteHouse(elem) {
    const dialogRef = this.dialog.open(DeleteHouseComponent, {
      data: { city: elem }
    });
    this.subscription = dialogRef.afterClosed().subscribe(response => {
      this.load(this.streetModel.id);
    });
  }

}
