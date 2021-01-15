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
export class LoginComponent extends BaseComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private authServices: AuthorizeService) {
    super(null, _snackBar);
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
    this.subscription = this.authServices.login(this.loginForm.getRawValue())
    .subscribe(res => {
      console.log(res);
      this.isSubscribe = true;
      this.openSnackBar(false, "Вход выполнен");
    }, error => {
      this.hasError = true;
      this.errorMessage = error.error;
      this.openSnackBar(true, "Ошибка " + this.errorMessage);
    });
  }
}
