import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StreetService } from '../../../services/street.services';
import { BaseComponent } from '../../../../shared/components/base.component';
import { HouseService } from '../../../services/house.service';

@Component({
  selector: 'app-delete-house',
  templateUrl: './delete-house.component.html',
  styleUrls: ['./delete-house.component.css']
})
export class DeleteHouseComponent extends BaseComponent implements OnInit  {

  constructor(private houseServices: HouseService,
    private route: ActivatedRoute,
    private router: Router,
    protected dialogRef: MatDialogRef<DeleteHouseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      super(dialogRef);

  }

  ngOnInit() {
  }


  confirm() {
    this.subscription = this.houseServices.deleteHouse(this.data.house.id).subscribe(resp => {
      this.isSubscribe = true;
      this.dialogRef.close();
    });
  }

  cancel() {
    this.dialogRef.close();
  }



}
