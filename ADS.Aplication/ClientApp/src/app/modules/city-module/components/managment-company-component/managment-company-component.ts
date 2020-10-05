import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog, Sort, PageEvent } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseComponent } from 'src/app/modules/shared/components/base.component';
import { ManagmentCompanyModel } from 'src/app/models/managmentcompany.model';
import { PaginationModel } from 'src/app/models/page.model';
import { MangmentCompanyService } from '../../services/managmentcompany.services';
import { ManagmentCompanyQuery } from '../../state/managmentcompany/managmentcompany.query';
import { AddCompanyComponent } from './add-company/add-company.component';
import { CitiesQuery } from '../../state/city.query';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { DeleteCompanyComponent } from './delete-company/delete-company.component';


@Component({
  selector: 'app-managment-company',
  templateUrl: './managment-company-component.html',
  styleUrls: ['./managment-company-component.css']
})
export class ManagmentCompanyComponent extends BaseComponent implements OnInit {
  managmentCompanies: ManagmentCompanyModel[];
  pagination: PaginationModel = new PaginationModel();
  displayedColumns: string[] = ['id', 'name', 'description', 'cityName', 'actions'];
  dataSource: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private managmentCompanyService: MangmentCompanyService,
    private managmentCompanyQuery: ManagmentCompanyQuery,
    cityQuery: CitiesQuery,
    private dialog: MatDialog) {
      super(null);
  }

  ngOnInit() {
    this.load();
  }

  load() {
    return this.managmentCompanyService.getManagmentCompanies().subscribe(res => {
      this.managmentCompanies = this.managmentCompanyQuery.getAll();
      this.pagination.currentPage =  this.managmentCompanyQuery.getValue().currentPage;
      this.pagination.pageSize = this.managmentCompanyQuery.getValue().pageSize;
      this.pagination.totalCount = this.managmentCompanyQuery.getValue().totalCount;
      this.pagination.selectItemsPerPage = this.managmentCompanyQuery.getValue().selectItemsPerPage;
      this.dataSource = new MatTableDataSource(this.managmentCompanies);
    });
  }

  addCompany() {
    const dialogRef = this.dialog.open(AddCompanyComponent, {
      height: '390px',
      width: '500px',
    });
    this.subscription = dialogRef.afterClosed().subscribe(response => {
      this.load();
    });
  }

  sortData(sort: Sort) {
    this.managmentCompanyService.setSort(sort);
    this.load();
  }

  switchPage(event: PageEvent) {
    this.changePage(event);
    this.managmentCompanyService.setPage(this.pagination);
    this.load();
  }

  editCompany(elem: ManagmentCompanyModel) {
    const dialogRef = this.dialog.open(EditCompanyComponent, {
      height: '390px',
      width: '500px',
      data: { company: elem }
    });
    this.subscription = dialogRef.afterClosed().subscribe(response => {
      this.load();
    });
  }

  deleteCompany(elem) {
    const dialogRef = this.dialog.open(DeleteCompanyComponent, {
      data: { company: elem }
    });
    this.subscription = dialogRef.afterClosed().subscribe(response => {
      this.load();
    });
  }

}
