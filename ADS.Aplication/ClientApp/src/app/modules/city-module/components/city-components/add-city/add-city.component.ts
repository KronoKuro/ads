import { Component, OnInit, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CityService } from '../../../services/city.services';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {
  subscription: Subscription;
  cityForm: FormGroup;
  isSubscribe: boolean = false;

  constructor(private cityServices: CityService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogRef: MatDialogRef<AddCityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
    this.cityForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(3)]]
    });
  }

  ngOnInit() {
  }


  addCity() {
    this.subscription = this.cityServices.addCity(this.cityForm.getRawValue()).subscribe(() => {
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
