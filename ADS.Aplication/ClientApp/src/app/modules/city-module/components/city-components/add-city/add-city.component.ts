import { Component, OnInit, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CityService } from '../../../services/city.services';
import { BaseComponent } from 'src/app/modules/shared/components/base.component';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent extends BaseComponent implements OnInit {
  cityForm: FormGroup;
  //lat = 54.1877917;
  //lng = 37.6000627;

  constructor(private cityServices: CityService,
    private route: ActivatedRoute,
    private router: Router,
    dialogRef: MatDialogRef<AddCityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
      super(dialogRef);
    this.cityForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(5)]],
      longitude: ['', {validators :[
        Validators.required,
        Validators.maxLength(250),
        Validators.minLength(1)
      ]}],
      latitude: ['', {validators: [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(1)
        ]}],
    });
  }

  ngOnInit() {
  }


  save() {
    this.subscription = this.cityServices.addCity(this.cityForm.getRawValue()).subscribe(() => {
      this.isSubscribe = true;
      this.closeDialog();
      this.hasError = false;
    }, error => {
      this.hasError = true;
      this.errorMessage = error.error;
      this.closeDialog();
    });
  }
}
