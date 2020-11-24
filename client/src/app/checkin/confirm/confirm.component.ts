import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CheckinService } from "../checkin.service";
import { User } from "../../core/models/user.model";
import { OfflineService } from "../../core/services/offline.service";

@Component({
  selector: 'app-checkin-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class CheckinConfirmComponent implements OnInit {

  public eventId: number;
  public user: User;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private _db: any;

  constructor(private _checkinService: CheckinService, private _offlineService: OfflineService, private _snackBar: MatSnackBar, private _dialogRef: MatDialogRef<CheckinConfirmComponent>, @Inject(MAT_DIALOG_DATA) private _data: any) {
    this.eventId = this._data.eventId;
    this.user = this._data.user;
    this._db = this._data.db;
  }

  ngOnInit(): void { }

  submit() {
    if(this._offlineService.isOnline) {
      this._checkinService.checkin({event_id: this.eventId, user_id: this.user.id}).subscribe((response: any) => {
        this._snackBar.open('Checkin successfully!', '', {duration: 2000});
        this._dialogRef.close({submitted: true});
      }, (error: any) => {
        this._snackBar.open(error.error.error, '', {duration: 2000});
      });
    } else {
      this.update();
    }
  }

  private update() {
    return this._db.users.get({event_id: this.eventId, id: this.user.id}).then((user: User) => {
      this._db.users.update({id: this.user.id}, {
        checkin_at: this.formatDate(new Date()),
        sync: false,
      }).then((user: User) => {
        this._snackBar.open('Checkin successfully!', '', {duration: 2000});
        this._dialogRef.close({submitted: false});
      }).catch(e => {
        alert('Error: ' + (e.stack || e));
      });
    });
  }

  private formatDate = function(date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':' + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  }

}
