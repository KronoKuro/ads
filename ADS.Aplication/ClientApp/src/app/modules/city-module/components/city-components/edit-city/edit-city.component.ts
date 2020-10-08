import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { CityService } from '../../../services/city.services';
import { BaseComponent } from 'src/app/modules/shared/components/base.component';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.css']
})
export class EditCityComponent extends BaseComponent implements OnInit {
  cityForm: FormGroup;

  constructor(private cityServices: CityService,
    _snackBar: MatSnackBar,
    dialogRef: MatDialogRef<EditCityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
      super(dialogRef, _snackBar);
      this.cityForm = this.formBuilder.group({
        id: new FormControl(data.city.id, Validators.required),
        name: new FormControl(data.city.name, Validators.required),
        longitude: new FormControl(data.city.longitude, { validators: [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(1)
        ]}),
        latitude: new FormControl(data.city.latitude, { validators: [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(1)
        ]}),

      });
  }

  ngOnInit() {
  }


  editCity() {
    this.subscription = this.cityServices.editCity(this.cityForm.getRawValue()).subscribe(() => {
      this.isSubscribe = true;
      this.closeDialog();
      this.openSnackBar(false, "Обновлено");
      this.hasError = false;
    },
    error => {
      this.hasError = true;
      this.errorMessage = error.error;
      this.closeDialog();
      this.openSnackBar(true, "Ошибка " + this.errorMessage);
    });
  }

}
