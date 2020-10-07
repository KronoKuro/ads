import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StreetService } from '../../../services/street.services';
import { BaseComponent } from '../../../../shared/components/base.component';
import { ApartmentService } from '../../../services/apartment.service';

@Component({
  selector: 'app-delete-apartament',
  templateUrl: './delete-apartament.component.html',
  styleUrls: ['./delete-apartament.component.css']
})
export class DeleteApartmentComponent extends BaseComponent implements OnInit  {

  constructor(private apartmentServices: ApartmentService,
    private route: ActivatedRoute,
    private router: Router,
    protected dialogRef: MatDialogRef<DeleteApartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      super(dialogRef);

  }

  ngOnInit() {
  }


  confirm() {
    this.subscription = this.apartmentServices.deleteApartment(this.data.apartment.id).subscribe(resp => {
      this.isSubscribe = true;
      this.dialogRef.close();
    });
  }

  cancel() {
    this.dialogRef.close();
  }



}
