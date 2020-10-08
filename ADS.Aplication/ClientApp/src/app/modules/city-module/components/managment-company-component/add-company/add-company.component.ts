import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { MangmentCompanyService } from '../../../services/managmentcompany.services';
import { BaseComponent } from 'src/app/modules/shared/components/base.component';
import { CityModel } from 'src/app/models/city.model';
import { CitiesQuery } from '../../../state/city.query';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent extends BaseComponent implements OnInit {
  comapnyForm: FormGroup;
  cities$: Observable<CityModel[]>;

  constructor(private comapnyServices: MangmentCompanyService,
    dialogRef: MatDialogRef<AddCompanyComponent>,
    cityQuery: CitiesQuery,
    @Inject(MAT_DIALOG_DATA) public data: any,
    _snackBar: MatSnackBar,
    private formBuilder: FormBuilder) {
      super(dialogRef, _snackBar);
    this.comapnyForm = this.formBuilder.group({
      name: new FormControl('', { validators: [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(1)]}),
      description: ['', {validators :[
          Validators.required,
          Validators.maxLength(250),
          Validators.minLength(1)
        ]}],
      cityId: ['', [Validators.required]]
    });
    this.cities$ = cityQuery.citiesForLookup$;
  }

  ngOnInit() {

  }


  save() {
    if(this.comapnyForm.status === 'INVALID')
      return;
    this.subscription = this.comapnyServices.addCompany(this.comapnyForm.getRawValue()).subscribe(() => {
      this.isSubscribe = true;
      this.closeDialog();
      this.hasError = false;
      this.openSnackBar(false, "Компания создана");
    }, error => {
      this.hasError = true;
      this.errorMessage = error.error;
      this.closeDialog();
      this.openSnackBar(true, "Ошибка " + this.errorMessage);
    });
  }
}
