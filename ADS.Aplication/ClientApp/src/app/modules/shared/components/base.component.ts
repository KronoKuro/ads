import { OnDestroy, Directive, Component } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialogRef, MatDialog, ErrorStateMatcher, PageEvent } from "@angular/material";
import { NgForm, FormGroupDirective, FormControl } from "@angular/forms";
import { PaginationModel } from '../../../models/page.model';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

// TODO: Add Angular decorator.
@Directive() export abstract class BaseComponent implements OnDestroy {

  subscription: Subscription;
  isSubscribe: boolean = false;
  hasError: boolean = false;
  errorMessage: string = null;
  matcher = new MyErrorStateMatcher();
  enumearableIsNotNull: boolean = true;
  pagination: PaginationModel = new PaginationModel();

  constructor(protected dialogRef: MatDialogRef<any>, protected dialog: MatDialog){

  }

  cancel() {
    this.dialogRef.close();
  }

  changePage(event: PageEvent) {
    this.pagination.currentPage = event.pageIndex + 1;
    this.pagination.pageSize = event.pageSize;
    this.pagination.totalCount = event.length;
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
