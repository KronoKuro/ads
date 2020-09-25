import { Component, OnInit, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseComponent } from '../../../../shared/components/base.component';
import { HouseService } from '../../../services/house.service';
import { StreetModel } from 'src/app/models/street.model';
import { StreetsQuery } from '../../../state/street/street.query';
import { ManagmentCompanyQuery } from '../../../state/managmentcompany/managmentcompany.query';

@Component({
  selector: 'app-edit-house',
  templateUrl: './edit-house.component.html',
  styleUrls: ['./edit-house.component.css']
})
export class EditHouseComponent extends BaseComponent implements OnInit {
  houseForm: FormGroup;
  streets$: Observable<StreetModel[]>;
  managmnetCompanies$: Observable<ManagmentCompanyModel[]>;

  constructor(private houseServices: HouseService,
    private route: ActivatedRoute,
    private router: Router,
    dialogRef: MatDialogRef<EditHouseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    streetQuery: StreetsQuery,
    managmentCompanyQuery: ManagmentCompanyQuery,
    private formBuilder: FormBuilder) {
      super(dialogRef, null);

      this.houseForm = this.formBuilder.group({
        id: new FormControl(data.house.id, Validators.required),
        name: new FormControl(data.house.name, { validators: [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(1)
        ]}),
        longitude: new FormControl(data.house.longitude, { validators: [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(1)
        ]}),
        latitude: new FormControl(data.house.latitude, { validators: [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(1)
        ]}),
        streetId: new FormControl(data.house.streetId, { validators: [Validators.required]}),
        managmentCompanyId: new FormControl(data.house.managmentCompanyId, { validators: []})
      });
      this.managmnetCompanies$ = managmentCompanyQuery.companiesForLookup$;
      this.streets$ = streetQuery.selectAll();
  }

  ngOnInit() {
  }


  save() {
    this.subscription = this.houseServices.editStreet(this.houseForm.getRawValue()).subscribe(() => {
      this.isSubscribe = true;
      this.closeDialog();
      this.hasError = false;
    },
    error => {
      this.hasError = true;
      this.errorMessage = error.error;
      this.closeDialog();

    });
  }

}
