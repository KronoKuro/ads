import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { MangmentCompanyService } from '../../../services/managmentcompany.services';
import { BaseComponent } from '../../../../shared/components/base.component';

@Component({
  selector: 'app-delete-company',
  templateUrl: './delete-company.component.html',
  styleUrls: ['./delete-company.component.css']
})
export class DeleteCompanyComponent extends BaseComponent implements OnInit  {

  constructor(private companyServices: MangmentCompanyService,
    protected dialogRef: MatDialogRef<DeleteCompanyComponent>,
    _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      super(dialogRef, _snackBar);
  }

  ngOnInit() {
  }

  confirm() {
    this.subscription = this.companyServices.deleteCompany(this.data.company.id).subscribe(resp => {
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
