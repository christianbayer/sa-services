import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { EventsService } from "../events.service";
import { Event } from "../../core/models/event.model";
import { MatDialog } from "@angular/material/dialog";
import { EventsConfirmSubscriptionComponent } from "../confirm-subscription/confirm-subscription.component";
import { Router } from "@angular/router";

@Component({
  selector: 'app-events-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class EventsListComponent implements OnInit {

  displayedColumns: string[] = ['actions', 'name', 'starts_at', 'ends_at'];
  dataSource: MatTableDataSource<Event> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _eventsService: EventsService, private _dialog: MatDialog, private _router: Router) { }

  ngOnInit(): void {
    this._eventsService.index().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response.events);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public onSubscribe(event: Event) {
    this._dialog.open(EventsConfirmSubscriptionComponent, {
      data: {
        event: event,
      }
    }).afterClosed().subscribe((data: any) => {
      if(data && data.submitted) {
        this._router.navigate(['/subscriptions']);
      }
    });
  }

}
