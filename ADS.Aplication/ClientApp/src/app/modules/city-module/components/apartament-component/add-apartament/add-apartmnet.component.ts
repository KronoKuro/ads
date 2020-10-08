import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from 'src/app/modules/shared/components/base.component';
import { ApartmentService } from '../../../services/apartment.service';

@Component({
  selector: 'app-add-apartmnet',
  templateUrl: './add-apartmnet.component.html',
  styleUrls: ['./add-apartmnet.component.css']
})
export class AddApartmnetComponent extends BaseComponent implements OnInit {
  apartmentForm: FormGroup;

  constructor(private apartmentServices: ApartmentService,
    dialogRef: MatDialogRef<AddApartmnetComponent>,
    _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
      super(dialogRef, _snackBar);
    this.apartmentForm = this.formBuilder.group({
      number: new FormControl('', { validators: [
        Validators.required] }),
      houseId: data.house.id
    });

  }

  ngOnInit() {
  }


  save() {
    if(this.apartmentForm.status == "INVALID")
      return;
    this.subscription = this.apartmentServices.addApartment(this.apartmentForm.getRawValue()).subscribe(() => {
      this.isSubscribe = true;
      this.closeDialog();
      this.hasError = false;
      this.openSnackBar(false, "Квартира создана");
    }, error => {
      this.hasError = true;
      this.errorMessage = error.error;
      this.closeDialog();
      this.openSnackBar(true, "Ошибка " + this.errorMessage);
    });
  }
}
