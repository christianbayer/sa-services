import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription } from "../../core/models/subscription.model";
import { SubscriptionsService } from "../subscriptions.service";

@Component({
  selector: 'app-subscriptions-confirm-unsubscription',
  templateUrl: './confirm-unsubscription.component.html',
  styleUrls: ['./confirm-unsubscription.component.scss']
})
export class SubscriptionsConfirmUnsubscriptionComponent implements OnInit {

  public subscription: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _subscriptionsService: SubscriptionsService, private _snackBar: MatSnackBar, private _dialogRef: MatDialogRef<SubscriptionsConfirmUnsubscriptionComponent>, @Inject(MAT_DIALOG_DATA) private _data: any) {
    this.subscription = this._data.subscription;
  }

  ngOnInit(): void { }

  submit() {
    this._subscriptionsService.unsubscribe(this.subscription.id).subscribe((response: any) => {
      this._snackBar.open('Unsubscribed successfully!', '', {duration: 2000});
      this._dialogRef.close({submitted: true})
    }, (error: any) => {
      this._snackBar.open(error.error.error, '', {duration: 2000});
    });
  }

}
