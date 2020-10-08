import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { StreetService } from '../../../services/street.services';
import { BaseComponent } from '../../../../shared/components/base.component';

@Component({
  selector: 'app-edit-street',
  templateUrl: './edit-street.component.html',
  styleUrls: ['./edit-street.component.css']
})
export class EditStreetComponent extends BaseComponent implements OnInit {
  streetForm: FormGroup;

  constructor(private streetServices: StreetService,
    dialogRef: MatDialogRef<EditStreetComponent>,
    _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
      super(dialogRef, _snackBar);
      this.streetForm = this.formBuilder.group({
        id: new FormControl(data.street.id, Validators.required),
        name: new FormControl(data.street.name, Validators.required),
        cityId: new FormControl(data.street.cityId, Validators.required),
      });
  }

  ngOnInit() {
  }


  save() {
    this.subscription = this.streetServices.editStreet(this.streetForm.getRawValue()).subscribe(() => {
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
