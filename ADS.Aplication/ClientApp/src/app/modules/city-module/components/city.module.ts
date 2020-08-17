import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CityComponent } from './city-components/city.component';
import { CityService } from '../services/city.services';
import { MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MatFormFieldModule, MatButtonModule } from '@angular/material';
import { CitiesStore } from '../state/city.store';
import { CitiesQuery } from '../state/city.query';
import { AddCityComponent } from './city-components/add-city/add-city.component';
import { EditCityComponent } from './city-components/edit-city/edit-city.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material-module';
import { DeleteCityComponent } from './city-components/delete-city/delete-city.component';
import { PaginationService } from '../../shared/services/pagination.service';
import { SortService } from '../../shared/services/sort.service';

const router = [
  { path: 'city', component: CityComponent }
]

@NgModule({
  declarations: [
    CityComponent,
    AddCityComponent,
    DeleteCityComponent,
    EditCityComponent
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forRoot(router)
  ],
  providers: [
    CityService,
    PaginationService,
    SortService,
    CitiesStore,
    CitiesQuery
  ],entryComponents: [
    AddCityComponent,
    DeleteCityComponent,
    EditCityComponent
  ],
})
export class CityModule { }
