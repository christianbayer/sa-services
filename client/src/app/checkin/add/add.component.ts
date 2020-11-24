import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CheckinService } from "../checkin.service";
import { User } from "../../core/models/user.model";
import { OfflineService } from "../../core/services/offline.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../auth/auth.service";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-checkin-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class CheckinAddComponent implements OnInit {

  public formGroup: FormGroup;

  private _eventId: number;
  private _db: any;

  constructor(private _checkinService: CheckinService, private _offlineService: OfflineService, private _snackBar: MatSnackBar, private _dialogRef: MatDialogRef<CheckinAddComponent>, @Inject(MAT_DIALOG_DATA) private _data: any, private _datePipe: DatePipe, private _router: Router) {
    this._eventId = this._data.eventId;
    this._db = this._data.db;
    this.formGroup = new FormGroup({
      'identity': new FormControl(null, [Validators.required]),
      'birthdate': new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void { }

  submit() {
    if(this.formGroup.invalid) {
      return false;
    }
    const value = this.formGroup.value;
    value.birthdate = this._datePipe.transform(value.birthdate, 'yyyy-MM-dd');
    if(this._offlineService.isOnline) {
      this._checkinService.checkin({
        event_id: this._eventId,
        identity: value.identity,
        birthdate: value.birthdate
      }).subscribe((response: any) => {
        this._snackBar.open('Checkin successfully!', '', {duration: 2000});
        this._dialogRef.close({submitted: true});
      }, (error: any) => {
        this._snackBar.open(error.error.error, '', {duration: 2000});
      });
    } else {
      this.insert({
        event_id: this._eventId,
        identity: value.identity,
        birthdate: value.birthdate,
        checkin_at: this.formatDate(new Date()),
        sync: false
      })
    }
  }

  private insert(data: any) {
    this._db.users.orderBy('id').first().then(user => {
      data.id = user.id >= 0 ? (-1) : user.id - 1;
      this._db.users.add(data).then(() => {
        this._snackBar.open('Checkin successfully!', '', {duration: 2000});
        this._dialogRef.close({submitted: false});
      }).catch(e => {
        alert('Error: ' + (e.stack || e));
      });
    })
  }

  private formatDate = function(date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':' + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  }

}
