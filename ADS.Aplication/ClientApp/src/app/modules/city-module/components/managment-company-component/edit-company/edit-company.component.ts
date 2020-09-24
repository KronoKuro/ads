import { Component, OnInit, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MangmentCompanyService } from '../../../services/managmentcompany.services';
import { BaseComponent } from 'src/app/modules/shared/components/base.component';
import { CityService } from '../../../services/city.services';
import { StreetModel } from 'src/app/models/street.model';
import { CityModel } from 'src/app/models/city.model';
import { CitiesQuery } from '../../../state/city.query';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent extends BaseComponent implements OnInit {
  comapnyForm: FormGroup;
  cities$: Observable<CityModel[]>;

  constructor(private comapnyServices: MangmentCompanyService,
    dialogRef: MatDialogRef<EditCompanyComponent>,
    cityQuery: CitiesQuery,
    cityService: CityService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
      super(dialogRef, null);
    this.comapnyForm = this.formBuilder.group({
      id: new FormControl(data.company.id),
      name: new FormControl(data.company.name, { validators: [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(1)]}),
      description: [data.company.description, {validators :[
          Validators.required,
          Validators.maxLength(250),
          Validators.minLength(1)
        ]}],
      cityId: [data.company.cityId, [Validators.required]]
    });
    this.cities$ = cityQuery.citiesForLookup$;
  }

  ngOnInit() {

  }


  save() {
    if(this.comapnyForm.status == "INVALID")
      return;
    this.subscription = this.comapnyServices.editCompany(this.comapnyForm.getRawValue()).subscribe(() => {
      this.isSubscribe = true;
      this.closeDialog();
      this.hasError = false;
    }, error => {
      this.hasError = true;
      this.errorMessage = error.error;
      this.closeDialog();
    });
  }
}
