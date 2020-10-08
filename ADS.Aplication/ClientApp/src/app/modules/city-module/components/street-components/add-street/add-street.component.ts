import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from 'src/app/modules/shared/components/base.component';
import { StreetService } from '../../../services/street.services';

@Component({
  selector: 'app-add-street',
  templateUrl: './add-street.component.html',
  styleUrls: ['./add-street.component.css']
})
export class AddStreetComponent extends BaseComponent implements OnInit {
  streetForm: FormGroup;


  constructor(private streetServices: StreetService,
    dialogRef: MatDialogRef<AddStreetComponent>,
    _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
      super(dialogRef, _snackBar);
    this.streetForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(5)]],
      cityId: new FormControl(data.city.id, Validators.required),
    });
  }

  ngOnInit() {
  }


  save() {
    this.subscription = this.streetServices.addStreet(this.streetForm.getRawValue()).subscribe(() => {
      this.isSubscribe = true;
      this.closeDialog();
      this.hasError = false;
      this.openSnackBar(false, "Улица создана");
    }, error => {
      this.hasError = true;
      this.errorMessage = error.error;
      this.closeDialog();
      this.openSnackBar(true, "Ошибка " + this.errorMessage);
    });
  }
}
