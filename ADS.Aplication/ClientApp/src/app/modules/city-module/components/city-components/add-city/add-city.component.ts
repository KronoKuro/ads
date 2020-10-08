import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { CityService } from '../../../services/city.services';
import { BaseComponent } from 'src/app/modules/shared/components/base.component';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent extends BaseComponent implements OnInit {
  cityForm: FormGroup;

  constructor(private cityServices: CityService,
    dialogRef: MatDialogRef<AddCityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    _snackBar: MatSnackBar,
    private formBuilder: FormBuilder) {
    super(dialogRef, _snackBar);
    this.cityForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(5)]],
      longitude: ['', {
        validators: [
          Validators.required,
          Validators.maxLength(250),
          Validators.minLength(1)
        ]
      }],
      latitude: ['', {
        validators: [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(1)
        ]
      }],
    });
  }

  ngOnInit() {
  }


  save() {
    this.subscription = this.cityServices.addCity(this.cityForm.getRawValue()).subscribe(() => {
      this.isSubscribe = true;
      this.closeDialog();
      this.hasError = false;
      this.openSnackBar(false, "Город создан");
    }, error => {
      this.hasError = true;
      this.errorMessage = error.error;
      this.closeDialog();
      this.openSnackBar(true, "Ошибка " + this.errorMessage);
    });
  }
}
