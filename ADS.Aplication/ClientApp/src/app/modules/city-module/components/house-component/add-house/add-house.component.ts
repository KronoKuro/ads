import { Component, OnInit, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CityService } from '../../../services/city.services';
import { BaseComponent } from 'src/app/modules/shared/components/base.component';
import { HouseService } from '../../../services/house.service';
import { StreetModel } from 'src/app/models/street.model';
import { HousesQuery } from '../../../state/houses/house.query';
import { StreetsQuery } from '../../../state/street/street.query';
import { ManagmentCompanyQuery } from '../../../state/managmentcompany/managmentcompany.query';
import { ManagmentCompanyModel } from 'src/app/models/managmentCompany.model';

@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.css']
})
export class AddHouseComponent extends BaseComponent implements OnInit {
  houseForm: FormGroup;
  streets$: Observable<StreetModel[]>;
  managmnetCompanies$: Observable<ManagmentCompanyModel[]>;

  constructor(private houseServices: HouseService,
    private streetQuery : StreetsQuery,
    private managmentCompanyQuery: ManagmentCompanyQuery,
    private route: ActivatedRoute,
    private router: Router,
    dialogRef: MatDialogRef<AddHouseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
      super(dialogRef);
    this.houseForm = this.formBuilder.group({
      name: new FormControl('', { validators: [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(1)]}),
      longitude: ['', {validators :[
          Validators.required,
          Validators.maxLength(250),
          Validators.minLength(1)
        ]}],
      latitude: ['', {validators: [
            Validators.required,
            Validators.maxLength(10),
            Validators.minLength(1)
          ]}],
      streetId: new FormControl(data.street.id, Validators.required),
      managmentCompanyId: [null, {validators: []}]
    });
    this.managmnetCompanies$ = managmentCompanyQuery.companiesForLookup$;
    this.streets$ = streetQuery.selectAll();

  }

  ngOnInit() {
  }


  save() {
    if(this.houseForm.status == "INVALID")
      return;
    this.subscription = this.houseServices.addHouse(this.houseForm.getRawValue()).subscribe(() => {
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
