import { Component, OnInit, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CityService } from '../../../services/city.services';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.css']
})
export class EditCityComponent implements OnInit {
  subscription: Subscription;
  cityForm: FormGroup;
  isSubscribe: boolean = false;

  constructor(private cityServices: CityService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogRef: MatDialogRef<EditCityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
      this.cityForm = this.formBuilder.group({
        id: new FormControl(data.city.id, Validators.required),
        name: new FormControl(data.city.name, Validators.required),
      });
  }

  ngOnInit() {
  }


  editCity() {
    this.subscription = this.cityServices.editCity(this.cityForm.getRawValue()).subscribe(() => {
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
