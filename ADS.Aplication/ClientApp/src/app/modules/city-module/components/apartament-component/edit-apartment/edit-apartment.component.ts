import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../../../shared/components/base.component';
import { ApartmentService } from '../../../services/apartment.service';

@Component({
  selector: 'app-edit-apartment',
  templateUrl: './edit-apartment.component.html',
  styleUrls: ['./edit-apartment.component.css']
})
export class EditApartmentComponent extends BaseComponent implements OnInit {
  apartmentForm: FormGroup;

  constructor(private apartmentServices: ApartmentService,
    dialogRef: MatDialogRef<EditApartmentComponent>,
    _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
      super(dialogRef, _snackBar);

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
      this.openSnackBar(false, "Обновлено");
    },
    error => {
      this.hasError = true;
      this.errorMessage = error.error;
      this.closeDialog();
      this.openSnackBar(true, "Ошибка " + this.errorMessage);
    });
  }

}
