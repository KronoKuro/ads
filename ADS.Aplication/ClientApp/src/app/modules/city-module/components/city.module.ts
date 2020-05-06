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
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material-module';
import { DeleteCityComponent } from './city-components/delete-city/delete-city.component';

const router = [
  { path: 'city', component: CityComponent }
  // { path: 'counter', component: CounterComponent },
  // { path: 'fetch-data', component: FetchDataComponent },
]

@NgModule({
  declarations: [
    CityComponent,
    AddCityComponent,
    DeleteCityComponent
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
    CitiesStore,
    CitiesQuery
  ],entryComponents: [
    AddCityComponent,
    DeleteCityComponent
  ],
})
export class CityModule { }
