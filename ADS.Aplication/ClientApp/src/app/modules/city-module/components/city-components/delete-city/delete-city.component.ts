import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CityService } from '../../../services/city.services';

@Component({
  selector: 'delete-add-city',
  templateUrl: './delete-city.component.html',
  styleUrls: ['./delete-city.component.css']
})
export class DeleteCityComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  cityForm: FormGroup;
  isSubscribe: boolean = false;

  constructor(private cityServices: CityService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogRef: MatDialogRef<DeleteCityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }


  deleteCity() {
    this.subscription = this.cityServices.deleteCity(this.data.city.id).subscribe(resp => {
      this.isSubscribe = true;
      this.dialogRef.close();
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
