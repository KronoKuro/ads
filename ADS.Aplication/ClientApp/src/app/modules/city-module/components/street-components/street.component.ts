import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { StreetService } from '../../services/street.services';
import { StreetModel } from '../../../../models/street.model';
import { MatSort, MatTableDataSource, MatDialog, Sort, PageEvent } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseComponent } from '../../../shared/components/base.component';
import { StreetsQuery } from '../../state/street/street.query';
import { ActivatedRoute } from '@angular/router';
import { CityModel } from 'src/app/models/city.model';
import { AddStreetComponent } from './add-street/add-street.component';
import { EditStreetComponent } from './edit-street/edit-street.component';
import { DeleteStreetComponent } from './delete-street/delete-street.component';
import { PaginationModel } from 'src/app/models/page.model';
import { StreetsStore } from '../../state/street/street.store';


@Component({
  selector: 'app-street',
  templateUrl: './street.component.html',
  styleUrls: ['./street.component.css']
})
export class StreetComponent extends BaseComponent implements OnInit {
  streets: StreetModel[];
  city: CityModel = new CityModel();
  displayedColumns: string[] = ['name', 'actions'];
  dataSource: any;
  cityId: string;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  panelOpenState = false;

  constructor(private streetService: StreetService,
    private streetQuery: StreetsQuery,
    dialog: MatDialog,
    private route: ActivatedRoute) {
      super(null, dialog);
      this.cityId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.subscription = this.load();
  }

  load() {
    return this.streetService.getStreets(this.cityId).subscribe(res => {
      this.city = res.city;
      this.streets = this.streetQuery.getAll();
      this.pagination.currentPage =  this.streetQuery.getValue().currentPage;
      this.pagination.pageSize = this.streetQuery.getValue().pageSize;
      this.pagination.totalCount = this.streetQuery.getValue().totalCount;
      this.pagination.selectItemsPerPage = this.streetQuery.getValue().selectItemsPerPage;
      this.dataSource = new MatTableDataSource(this.streets);
      this.enumearableIsNotNull = this.streets.length !== 0;
    });
  }


  addStreet(city: CityModel) {
     const dialogRef = this.dialog.open(AddStreetComponent, {
        data: { city: city },
        height: '200px',
        width: '500px',
    });
    this.subscription = dialogRef.afterClosed().subscribe(response => {
      this.load();
    });
  }

  switchPage(event: PageEvent) {
    this.changePage(event);
    this.streetService.setPage(this.pagination);
    this.load();
  }

  editStreet(elem: StreetModel) {
    const dialogRef = this.dialog.open(EditStreetComponent, {
      height: '200px',
      width: '500px',
      data: { street: elem }
    });
    this.subscription = dialogRef.afterClosed().subscribe(response => {
      this.load();
    });
  }

  deleteStreet(elem) {
    const dialogRef = this.dialog.open(DeleteStreetComponent, {
      data: { street: elem }
    });
    this.subscription = dialogRef.afterClosed().subscribe(response => {
      this.load();
    });
  }

}
