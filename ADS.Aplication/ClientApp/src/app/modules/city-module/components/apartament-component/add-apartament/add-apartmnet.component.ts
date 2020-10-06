import { Component, OnInit, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseComponent } from 'src/app/modules/shared/components/base.component';
import { ApartmentService } from '../../../services/apartment.service';

@Component({
  selector: 'app-add-apartmnet',
  templateUrl: './add-apartmnet.component.html',
  styleUrls: ['./add-apartmnet.component.css']
})
export class AddApartmnetComponent extends BaseComponent implements OnInit {
  apartmentForm: FormGroup;

  constructor(private apartmentServices: ApartmentService,
    private route: ActivatedRoute,
    private router: Router,
    dialogRef: MatDialogRef<AddApartmnetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
      super(dialogRef);
    this.apartmentForm = this.formBuilder.group({
      number: new FormControl('', { validators: [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(1)] })
    });

  }

  ngOnInit() {
  }


  save() {
    if(this.apartmentForm.status == "INVALID")
      return;
    this.subscription = this.apartmentServices.addApartment(this.apartmentForm.getRawValue()).subscribe(() => {
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
