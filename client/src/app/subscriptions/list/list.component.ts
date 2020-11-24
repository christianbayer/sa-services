import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { SubscriptionsService } from "../subscriptions.service";
import { Subscription } from "../../core/models/subscription.model";
import { SubscriptionsConfirmUnsubscriptionComponent } from "../confirm-unsubscription/confirm-unsubscription.component";

@Component({
  selector: 'app-subscriptions-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class SubscriptionsListComponent implements OnInit {

  public displayedColumns: string[] = ['actions', 'name', 'subscribed_at', 'starts_at', 'ends_at'];
  public dataSource: MatTableDataSource<Subscription> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _subscriptionsService: SubscriptionsService, private _dialog: MatDialog, private _router: Router) { }

  ngOnInit(): void {
    this.load();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public onUnsubscribe(subscription: Subscription) {
    this._dialog.open(SubscriptionsConfirmUnsubscriptionComponent, {
      data: {
        subscription: subscription,
      }
    }).afterClosed().subscribe((data: any) => {
      if(data && data.submitted) {
        this.load();
      }
    });
  }

  public onPrint(subscription: Subscription) {

  }

  private load() {
    this._subscriptionsService.list().subscribe((response: any) => {
      const now = new Date();
      const subscriptions = response.subscriptions.map(subscription => {
        const startsAt = new Date(subscription.starts_at);
        const startsAtDiffDays = Math.ceil((+startsAt - +now) / (1000 * 60 * 60 * 24));
        return {
          ...subscription,
          cancelable: startsAtDiffDays > 2,
          printable: subscription.checkin_at
        };
      })
      this.dataSource = new MatTableDataSource(subscriptions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}
