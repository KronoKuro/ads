import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MangmentCompanyService } from '../../../services/managmentcompany.services';
import { BaseComponent } from '../../../../shared/components/base.component';

@Component({
  selector: 'app-delete-company',
  templateUrl: './delete-company.component.html',
  styleUrls: ['./delete-company.component.css']
})
export class DeleteCompanyComponent extends BaseComponent implements OnInit  {

  constructor(private companyServices: MangmentCompanyService,
    private route: ActivatedRoute,
    private router: Router,
    protected dialogRef: MatDialogRef<DeleteCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      super(dialogRef, null);

  }

  ngOnInit() {
  }


  confirm() {
    this.subscription = this.companyServices.deleteCompany(this.data.company.id).subscribe(resp => {
      this.isSubscribe = true;
      this.dialogRef.close();
    });
  }

  cancel() {
    this.dialogRef.close();
  }



}
