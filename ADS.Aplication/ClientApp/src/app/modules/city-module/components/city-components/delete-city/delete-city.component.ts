import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { CityService } from '../../../services/city.services';
import { BaseComponent } from '../../../../shared/components/base.component';

@Component({
  selector: 'delete-add-city',
  templateUrl: './delete-city.component.html',
  styleUrls: ['./delete-city.component.css']
})
export class DeleteCityComponent extends BaseComponent  {
  cityForm: FormGroup;
  isSubscribe: boolean = false;

  constructor(private cityServices: CityService,
    _snackBar: MatSnackBar,
    protected dialogRef: MatDialogRef<DeleteCityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      super(dialogRef, _snackBar);
  }




  confirm() {
    this.subscription = this.cityServices.deleteCity(this.data.city.id).subscribe(resp => {
      this.isSubscribe = true;
      this.closeDialog();
      this.openSnackBar(false, "Удалено");
    }, error=> {
      this.hasError = true;
      this.errorMessage = error.error;
      this.closeDialog();
      this.openSnackBar(true, "Ошибка " + this.errorMessage);
    });
  }

  cancel() {
    this.dialogRef.close();
  }


  ngOnDestroy() {
    if (this.isSubscribe) {
      this.subscription.unsubscribe();
    }
  }
}
