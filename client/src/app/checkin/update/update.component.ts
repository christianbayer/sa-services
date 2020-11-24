import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CheckinService } from "../checkin.service";
import { OfflineService } from "../../core/services/offline.service";

@Component({
  selector: 'app-checkin-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class CheckinUpdateComponent implements OnInit {

  private _db: any;
  private _users: any;
  private _eventId: number;

  constructor(private _checkinService: CheckinService, private _offlineService: OfflineService, private _snackBar: MatSnackBar, private _dialogRef: MatDialogRef<CheckinUpdateComponent>, @Inject(MAT_DIALOG_DATA) private _data: any) {
    this._eventId = this._data.eventId;
    this._users = this._data.users;
    this._db = this._data.db;
  }

  ngOnInit(): void { }

  submit() {
    for(let user of this._users) {
      this._checkinService.checkin({
        event_id: this._eventId,
        user_id: user.id < 1 ? null : user.id,
        identity: user.identity,
        birthdate: user.birthdate,
        checkin_at: user.checkin_at
      }).subscribe((response: any) => {
        this._snackBar.open('Checkin successfully!', '', {duration: 2000});
        this._dialogRef.close({submitted: true});
      }, (error: any) => {
        this._snackBar.open(error.error.error, '', {duration: 2000});
      });
    }
  }

}
