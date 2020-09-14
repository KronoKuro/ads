import { OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialogRef, MatDialog } from "@angular/material";

export abstract class BaseComponent implements OnDestroy {

  subscription: Subscription;
  isSubscribe: boolean = false;
  hasError: boolean = false;
  errorMessage: string = null;
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
