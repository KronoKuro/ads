import { Component, OnInit, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CityService } from '../../../services/city.services';
import { BaseComponent } from 'src/app/modules/shared/components/base.component';
import { StreetService } from '../../../services/street.services';

@Component({
  selector: 'app-add-street',
  templateUrl: './add-street.component.html',
  styleUrls: ['./add-street.component.css']
})
export class AddStreetComponent extends BaseComponent implements OnInit {
  streetForm: FormGroup;


  constructor(private streetServices: StreetService,
    private route: ActivatedRoute,
    private router: Router,
    dialogRef: MatDialogRef<AddStreetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
      super(dialogRef);
    this.streetForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(5)]],
      cityId: new FormControl(data.city.id, Validators.required),
    });
  }

  ngOnInit() {
  }


  save() {
    this.subscription = this.streetServices.addStreet(this.streetForm.getRawValue()).subscribe(() => {
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
