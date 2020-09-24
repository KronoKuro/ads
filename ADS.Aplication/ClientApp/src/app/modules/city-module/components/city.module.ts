import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
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
import { StreetService } from '../services/street.services';
import { StreetsStore } from '../state/street/street.store';
import { StreetsQuery } from '../state/street/street.query';
import { StreetComponent } from './street-components/street.component';
import { AddStreetComponent } from './street-components/add-street/add-street.component';
import { EditStreetComponent } from './street-components/edit-street/edit-street.component';
import { DeleteStreetComponent } from './street-components/delete-street/delete-street.component';
import { HouseComponent } from 'src/app/modules/city-module/components/house-component/house.component';
import { HouseService } from '../services/house.service';
import { HouseStore } from '../state/houses/house.store';
import { HousesQuery } from '../state/houses/house.query';
import { AddHouseComponent } from './house-component/add-house/add-house.component';
import { EditHouseComponent } from './house-component/edit-house/edit-house.component';
import { DeleteHouseComponent } from './house-component/delete-house/delete-house.component';
import { ManagmentCompanyComponent } from './managment-company-component/managment-company-component';
import { MangmentCompanyService } from '../services/managmentcompany.services';
import { ManagmentCompanyQuery } from '../state/managmentcompany/managmentcompany.query';
import { ManagmentCompanyStore } from '../state/managmentcompany/managmentcompany.store';
import { AddCompanyComponent } from './managment-company-component/add-company/add-company.component';
import { EditCompanyComponent } from './managment-company-component/edit-company/edit-company.component';
import { DeleteCompanyComponent } from './managment-company-component/delete-company/delete-company.component';

const router = [
  { path: 'city', component: CityComponent },
  { path: 'streets/:id', component: StreetComponent },
  { path: 'managmentcompany', component: ManagmentCompanyComponent }
]


export function initAppFactory(
  //houseService: HouseService,
  //streetService: StreetService,
  cityService: CityService
  ) {
  return async () => {
    await Promise.all([cityService.getCityForLookup()])
    // await Promise.all([
    //   metadataService.refreshMetadata(),
    //   versionService.getVersions(),
    //   pivotTableService.loadPivotTables(),
    //   scenarioService.RefreshScenarios(),
    //   permissionsService.refreshMetadata()
    // ]);
  }
}

@NgModule({
  declarations: [
    CityComponent,
    StreetComponent,
    AddCityComponent,
    DeleteCityComponent,
    EditCityComponent,
    AddStreetComponent,
    EditStreetComponent,
    DeleteStreetComponent,
    HouseComponent,
    AddHouseComponent,
    EditHouseComponent,
    DeleteHouseComponent,
    ManagmentCompanyComponent,
    AddCompanyComponent,
    EditCompanyComponent,
    DeleteCompanyComponent
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
    StreetService,
    PaginationService,
    SortService,
    HouseService,
    MangmentCompanyService,
    CitiesStore,
    StreetsStore,
    HouseStore,
    ManagmentCompanyStore,
    CitiesQuery,
    StreetsQuery,
    HousesQuery,
    ManagmentCompanyQuery,
    { provide: APP_INITIALIZER,
      useFactory: initAppFactory,
      deps: [CityService], multi: true
    }
  ],entryComponents: [
    AddCityComponent,
    DeleteCityComponent,
    EditCityComponent,
    AddStreetComponent,
    EditStreetComponent,
    DeleteStreetComponent,
    HouseComponent,
    AddHouseComponent,
    EditHouseComponent,
    DeleteHouseComponent,
    AddCompanyComponent,
    EditCompanyComponent,
    DeleteCompanyComponent
  ],
})
export class CityModule { }
