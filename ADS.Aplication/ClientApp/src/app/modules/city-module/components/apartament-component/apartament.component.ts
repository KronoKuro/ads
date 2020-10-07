import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog, Sort, PageEvent } from '@angular/material';

import { SortPage } from '../../../../models/sortpage.model';
import { BaseComponent } from 'src/app/modules/shared/components/base.component';
import { HouseModel } from '../../../../models/house.model';
import { ApartmentService } from '../../services/apartment.service';
import { ApartmentQuery } from '../../state/apartment/apartment.query';
import { ApartmentModel } from 'src/app/models/apartment.model';
import { ActivatedRoute } from '@angular/router';
import { AddApartmnetComponent } from './add-apartament/add-apartmnet.component';
import { EditApartmentComponent } from './edit-apartment/edit-apartment.component';
import { DeleteApartmentComponent } from './delete-apartament/delete-apartament.component';


@Component({
  selector: 'app-apartament',
  templateUrl: './apartament.component.html',
  styleUrls: ['./apartament.component.css']
})
export class ApartamentComponent extends BaseComponent implements OnInit {
  apartments: ApartmentModel[];
  houseId: string;
  cityId: string;
  house: HouseModel;
  displayedColumns: string[] = ['id', 'number', 'actions'];
  dataSource: any;
  sort: SortPage;

  constructor(private apartmentService: ApartmentService,
    private apartmentQuery: ApartmentQuery,
    private route: ActivatedRoute,
    private dialog: MatDialog) {
      super(null);
      this.houseId = this.route.snapshot.params['id'];
      this.load(this.houseId);
  }

  ngOnInit() {

  }

  load(id: string) {
    return this.apartmentService.getApartments(id).subscribe(res => {
      this.apartments = this.apartmentQuery.getAll();
      this.house = res.entity;
      this.cityId = this.house.street.cityId;
      this.pagination.currentPage =  this.apartmentQuery.getValue().currentPage;
      this.pagination.pageSize = this.apartmentQuery.getValue().pageSize;
      this.pagination.totalCount = this.apartmentQuery.getValue().totalCount;
      this.pagination.selectItemsPerPage = this.apartmentQuery.getValue().selectItemsPerPage;
      this.dataSource = new MatTableDataSource(this.apartments);
      this.enumearableIsNotNull = this.apartments.length !== 0;
    });
  }

  addApartmnet() {
    const dialogRef = this.dialog.open(AddApartmnetComponent, {
      data: { house: this.house },
      height: '230px',
      width: '300px',
    });
    this.subscription = dialogRef.afterClosed().subscribe(response => {
      this.load(this.house.id);
    });
  }

  sortData(sort: Sort) {
    this.apartmentService.setSort(sort);
    this.load(this.house.id);
  }

  switchPage(event: PageEvent) {
    this.changePage(event);
    this.apartmentService.setPage(this.pagination);
    this.load(this.house.id);
  }

  editApartment(elem: HouseModel) {
    const dialogRef = this.dialog.open(EditApartmentComponent, {
      height: '200px',
      width: '300px',
      data: { apartment: elem, house: this.house }
    });
    this.subscription = dialogRef.afterClosed().subscribe(response => {
      this.load(this.house.id);
    });
  }

  deleteApartment(elem) {
    const dialogRef = this.dialog.open(DeleteApartmentComponent, {
      data: { apartment: elem }
    });
    this.subscription = dialogRef.afterClosed().subscribe(response => {
      this.load(this.house.id);
    });
  }

}
