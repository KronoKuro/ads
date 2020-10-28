import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MatFormFieldModule, MatButtonModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../modules/shared/material-module';
import { LoginComponent } from '../authorize-module/components/login-component/login.component';
import { AuthorizeService } from '../authorize-module/services/authorize.service';
import { AuthorizeQuery } from './state/authorize/authorize.query';
import { AuthorizeStore } from './state/authorize/authorize.store';


const router = [
  { path: 'login', component: LoginComponent }
]

@NgModule({
  declarations: [
    LoginComponent
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
    AuthorizeService,
    AuthorizeQuery,
    AuthorizeStore
  ],
  entryComponents: [

  ],
})
export class AuthorizeModule { }
