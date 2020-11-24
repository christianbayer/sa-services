import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { CheckinService } from "../checkin.service";
import { User } from "../../core/models/user.model";
import { CheckinConfirmComponent } from "../confirm/confirm.component";
import Dexie from "dexie";
import { OfflineService } from "../../core/services/offline.service";
import { CheckinUpdateComponent } from "../update/update.component";
import { CheckinAddComponent } from "../add/add.component";

@Component({
  selector: 'app-checkin-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class CheckinListComponent implements OnInit {

  public displayedColumns: string[] = ['actions', 'name', 'identity', 'birthdate', 'subscribed_at'];
  public dataSource: MatTableDataSource<User> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private _eventId: number;
  private _db: any;

  constructor(private _checkinService: CheckinService, private _offlineService: OfflineService, private _dialog: MatDialog, private _route: ActivatedRoute, private _router: Router) {
    this._eventId = +this._route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.createDatabase();
    this.load();
    this._offlineService.connectionChanged.subscribe((online: boolean) => {
      this.update(online);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public onCheckin(user: User) {
    this._dialog.open(CheckinConfirmComponent, {
      data: {
        db: this._db,
        eventId: this._eventId,
        user: user,
      }
    }).afterClosed().subscribe((data: any) => {
      if(data) {
        this.load();
      }
    });
  }

  public add() {
    this._dialog.open(CheckinAddComponent, {
      data: {
        db: this._db,
        eventId: this._eventId,
      }
    }).afterClosed().subscribe(() => {
      this.load();
    });
  }

  private load() {
    if(this._offlineService.isOnline) {
      this._checkinService.list(this._eventId).subscribe((response: any) => {
        this.dataSource = new MatTableDataSource(response.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        response.users.map((user: User) => this.insert(user));
      });
    } else {
      this.get().then((users: User[]) => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }
  }

  private createDatabase() {
    this._db = new Dexie('sa-services');
    this._db.version(1).stores({
      users: 'id,event_id,name,identity,birthdate,subscribed_at,checkin_at,sync'
    });
    if(this._offlineService.isOnline) {
      this._db.users.clear();
    }
  }

  private insert(user: User) {
    const _user: any = {
      id: user.id,
      event_id: this._eventId,
      name: user.name,
      identity: user.identity,
      birthdate: user.birthdate,
      subscribed_at: user.subscribed_at,
      checkin_at: (<any>user).checkin_at,
      sync: true,
    };
    this._db.users.get({event_id: this._eventId, id: user.id}).then((user: User) => {
      if(user) {
        this._db.users.update({id: user.id}, _user).catch(e => {
          alert('Error: ' + (e.stack || e));
        });
      } else {
        this._db.users.add(_user).catch(e => {
          alert('Error: ' + (e.stack || e));
        });
      }
    });
  }

  private async get(): Promise<User[]> {
    return await this._db.users.where({event_id: this._eventId}).toArray();
  }

  private update(online: boolean) {
    if(online) {
      this.get().then((users: any) => {
        let mustUpdate: any = [];
        for(let user of users) {
          if(!user.sync) {
            mustUpdate.push(user);
          }
        }
        if(mustUpdate.length) {
          this._dialog.open(CheckinUpdateComponent, {
            data: {
              db: this._db,
              eventId: this._eventId,
              users: mustUpdate,
            }
          }).afterClosed().subscribe((data: any) => {
            if(data) {
              this.load();
            }
          });
        }
      });
    }
  }

}
