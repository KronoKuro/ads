import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { BaseComponent } from '../../../../modules/shared/components/base.component';
import { AuthorizeService } from '../../services/authorize.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    protected _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private authServices: AuthorizeService) {
    //super(null, _snackBar);
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(5)]],
      password: ['', {
        validators: [
          Validators.required,
          Validators.maxLength(250),
          Validators.minLength(6)
        ]
      }]
    });
  }

  ngOnInit() {
  }


  onSubmit() {
    this.authServices.login(this.loginForm.getRawValue()).subscribe(res => {
      this.openSnackBar(false, "Вход выполнен");
    }, error => {
      //this.hasError = true;
      //this.errorMessage = error.error;
      this.openSnackBar(true, "Ошибка " + error);
    });
  }


  openSnackBar(isError: boolean, message: string) {
    if (isError === true) {
      this._snackBar.open(message, null, {
        duration: 6000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    } else {
      this._snackBar.open(message, null, {
        duration: 6000,
        panelClass: ['mat-toolbar', 'mat-primary']
      });
    }
  }
}
