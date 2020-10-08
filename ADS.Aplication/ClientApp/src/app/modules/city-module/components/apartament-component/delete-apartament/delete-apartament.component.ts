import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../../../shared/components/base.component';
import { ApartmentService } from '../../../services/apartment.service';

@Component({
  selector: 'app-delete-apartament',
  templateUrl: './delete-apartament.component.html',
  styleUrls: ['./delete-apartament.component.css']
})
export class DeleteApartmentComponent extends BaseComponent implements OnInit  {

  constructor(private apartmentServices: ApartmentService,
    _snackBar: MatSnackBar,
    protected dialogRef: MatDialogRef<DeleteApartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      super(dialogRef, _snackBar);

  }

  ngOnInit() {
  }


  confirm() {
    this.subscription = this.apartmentServices.deleteApartment(this.data.apartment.id).subscribe(resp => {
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
