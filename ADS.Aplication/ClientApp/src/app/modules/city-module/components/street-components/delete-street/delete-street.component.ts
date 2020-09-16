import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StreetService } from '../../../services/street.services';
import { BaseComponent } from '../../../../shared/components/base.component';

@Component({
  selector: 'app-delete-street',
  templateUrl: './delete-street.component.html',
  styleUrls: ['./delete-street.component.css']
})
export class DeleteStreetComponent extends BaseComponent implements OnInit  {

  constructor(private streetServices: StreetService,
    private route: ActivatedRoute,
    private router: Router,
    protected dialogRef: MatDialogRef<DeleteStreetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      super(dialogRef, null);

  }

  ngOnInit() {
  }


  confirm() {
    this.subscription = this.streetServices.deleteStreet(this.data.street.id).subscribe(resp => {
      this.isSubscribe = true;
      this.dialogRef.close();
    });
  }

  cancel() {
    this.dialogRef.close();
  }



}
