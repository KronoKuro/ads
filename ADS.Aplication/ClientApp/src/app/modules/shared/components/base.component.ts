import { OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialogRef, MatDialog, ErrorStateMatcher } from "@angular/material";
import { NgForm, FormGroupDirective, FormControl } from "@angular/forms";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export abstract class BaseComponent implements OnDestroy {

  subscription: Subscription;
  isSubscribe: boolean = false;
  hasError: boolean = false;
  errorMessage: string = null;
  matcher = new MyErrorStateMatcher();

  constructor(protected dialogRef: MatDialogRef<any>, protected dialog: MatDialog){

  }

  cancel() {
    this.dialogRef.close();
  }


  closeDialog() {
    if(!this.hasError){
      this.dialogRef.close();
    }
  }


  ngOnDestroy() {
    if (this.isSubscribe) {
      this.subscription.unsubscribe();
    }
  }
}
