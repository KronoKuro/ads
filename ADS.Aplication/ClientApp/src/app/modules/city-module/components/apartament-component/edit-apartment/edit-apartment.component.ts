import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseComponent } from '../../../../shared/components/base.component';
import { ApartmentService } from '../../../services/apartment.service';
import { StreetModel } from '../../../../../models/street.model';
import { StreetsQuery } from '../../../state/street/street.query';
import { ManagmentCompanyQuery } from '../../../state/managmentcompany/managmentcompany.query';
import { ManagmentCompanyModel } from '../../../../../models/managmentCompany.model';
import { AgmMap } from '@agm/core';

@Component({
  selector: 'app-edit-apartment',
  templateUrl: './edit-apartment.component.html',
  styleUrls: ['./edit-apartment.component.css']
})
export class EditApartmentComponent extends BaseComponent implements OnInit {
  apartmentForm: FormGroup;

  constructor(private apartmentServices: ApartmentService,
    dialogRef: MatDialogRef<EditApartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
      super(dialogRef);

      this.apartmentForm = this.formBuilder.group({
        id: new FormControl(data.apartment.id, Validators.required),
        number: new FormControl(data.apartment.number, { validators: [
          Validators.required
        ]}),
        houseId: data.house.id
      });
  }

  ngOnInit() {
  }


  save() {
    this.subscription = this.apartmentServices.editApartment(this.apartmentForm.getRawValue()).subscribe(() => {
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
