import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { StreetService } from '../../../services/street.services';
import { BaseComponent } from '../../../../shared/components/base.component';

@Component({
  selector: 'app-delete-street',
  templateUrl: './delete-street.component.html',
  styleUrls: ['./delete-street.component.css']
})
export class DeleteStreetComponent extends BaseComponent implements OnInit  {

  constructor(private streetServices: StreetService,
    protected dialogRef: MatDialogRef<DeleteStreetComponent>,
    _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      super(dialogRef, _snackBar);

  }

  ngOnInit() {
  }

  confirm() {
    this.subscription = this.streetServices.deleteStreet(this.data.street.id).subscribe(resp => {
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



}
