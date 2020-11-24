import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { EventsService } from "../events.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Event } from "../../core/models/event.model";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-events-confirm-subscription',
  templateUrl: './confirm-subscription.component.html',
  styleUrls: ['./confirm-subscription.component.scss']
})
export class EventsConfirmSubscriptionComponent implements OnInit {

  public event: Event;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _eventsService: EventsService, private _snackBar: MatSnackBar, private _dialogRef: MatDialogRef<EventsConfirmSubscriptionComponent>, @Inject(MAT_DIALOG_DATA) private _data: any) {
    this.event = this._data.event;
  }

  ngOnInit(): void { }

  submit() {
    this._eventsService.subscribe(this.event.id).subscribe((response: any) => {
      this._snackBar.open('Subscribed successfully!', '', {duration: 2000});
      this._dialogRef.close({submitted: true})
    }, (error: any) => {
      console.log(error);
      this._snackBar.open(error.error.error, '', {duration: 2000});
    });
  }

}
