import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { CityService } from '../../services/city.services';
import { CityModel } from '../../../../models/city.model';
import { MatSort, MatTableDataSource, MatDialog, Sort, PageEvent } from '@angular/material';
import { CitiesQuery } from '../../state/city.query';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { SortPage } from '../../../../models/sortpage.model';
import { BaseComponent } from 'src/app/modules/shared/components/base.component';
import { StreetModel } from '../../../../models/street.model';
import { HousesQuery } from '../../state/houses/house.query';
import { HouseModel } from '../../../../models/house.model';
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
  cityModel: CityModel;
  houses: HouseModel[];
  displayedColumns: string[] = ['id', 'name', 'managmentCompany', 'managmentCompanyId', 'latitude', 'longitude', 'actions'];
  dataSource: any;
  sort: SortPage;

  @Input() set street(street: StreetModel) {
    this.streetModel = street;
    this.subscription = this.load(street.id);
  }


  @Input() set city(city: CityModel) {
    this.cityModel = city;
  }



  constructor(private houseService: HouseService,
    private houseQuery: HousesQuery,
    private dialog: MatDialog) {
      super(null);
  }

  ngOnInit() {
  }

  load(id: string) {
    return this.houseService.getHouses(id).subscribe(res => {
      this.houses = this.houseQuery.getAll();
      this.pagination.currentPage =  this.houseQuery.getValue().currentPage;
      this.pagination.pageSize = this.houseQuery.getValue().pageSize;
      this.pagination.totalCount = this.houseQuery.getValue().totalCount;
      this.pagination.selectItemsPerPage = this.houseQuery.getValue().selectItemsPerPage;
      this.dataSource = new MatTableDataSource(this.houses);
      this.enumearableIsNotNull = this.houses.length !== 0;
    });
  }

  addHouse() {
    const dialogRef = this.dialog.open(AddHouseComponent, {
      data: { street: this.streetModel },
      height: '430px',
      width: '500px',
    });
    this.subscription = dialogRef.afterClosed().subscribe(response => {
      this.load(this.streetModel.id);
    });
  }

  listApartments(model: HouseModel) {

  }


  sortData(sort: Sort) {
    this.houseService.setSort(sort);
    this.load(this.streetModel.id);
  }

  switchPage(event: PageEvent) {
    this.changePage(event);
    this.houseService.setPage(this.pagination);
    this.load(this.streetModel.id);
  }

  editHouse(elem: HouseModel) {
    const dialogRef = this.dialog.open(EditHouseComponent, {
      height: '630px',
      width: '600px',
      data: { house: elem, city: this.cityModel }
    });
    this.subscription = dialogRef.afterClosed().subscribe(response => {
      this.load(this.streetModel.id);
    });
  }

  deleteHouse(elem) {
    const dialogRef = this.dialog.open(DeleteHouseComponent, {
      data: { house: elem }
    });
    this.subscription = dialogRef.afterClosed().subscribe(response => {
      this.load(this.streetModel.id);
    });
  }

}
