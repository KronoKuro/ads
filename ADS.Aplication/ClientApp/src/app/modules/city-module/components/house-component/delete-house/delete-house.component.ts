import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { BaseComponent } from '../../../../shared/components/base.component';
import { HouseService } from '../../../services/house.service';
import { StreetsQuery } from '../../../state/street/street.query';

@Component({
  selector: 'app-delete-house',
  templateUrl: './delete-house.component.html',
  styleUrls: ['./delete-house.component.css']
})
export class DeleteHouseComponent extends BaseComponent implements OnInit  {

  constructor(private houseServices: HouseService,
    _snackBar: MatSnackBar,
    streetQuery: StreetsQuery,
    protected dialogRef: MatDialogRef<DeleteHouseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      super(dialogRef, _snackBar);

  }

  ngOnInit() {
  }

  confirm() {
    this.subscription = this.houseServices.deleteHouse(this.data.house.id).subscribe(resp => {
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
