import { Component, OnInit, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StreetService } from '../../../services/street.services';
import { BaseComponent } from '../../../../shared/components/base.component';

@Component({
  selector: 'app-edit-street',
  templateUrl: './edit-street.component.html',
  styleUrls: ['./edit-street.component.css']
})
export class EditStreetComponent extends BaseComponent implements OnInit {
  streetForm: FormGroup;

  constructor(private streetServices: StreetService,
    private route: ActivatedRoute,
    private router: Router,
    dialogRef: MatDialogRef<EditStreetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
      super(dialogRef);
      this.streetForm = this.formBuilder.group({
        id: new FormControl(data.street.id, Validators.required),
        name: new FormControl(data.street.name, Validators.required),
        cityId: new FormControl(data.street.cityId, Validators.required),
      });
  }

  ngOnInit() {
  }


  save() {
    this.subscription = this.streetServices.editStreet(this.streetForm.getRawValue()).subscribe(() => {
      this.isSubscribe = true;
      this.closeDialog();
      this.hasError = false;
    },
    error => {
      this.hasError = true;
      this.errorMessage = error.error;
      this.closeDialog();

    });
  }

}
