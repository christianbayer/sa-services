import { Component, OnInit } from '@angular/core';
import { SessionService } from "../core/services/session.service";
import { User } from "../core/models/user.model";
import { OfflineService } from "../core/services/offline.service";

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  public hasUser: boolean;
  public isOnline: boolean;

  constructor(private _sessionService: SessionService, private _offlineService: OfflineService) {
    this.hasUser = !!_sessionService.user;
    this._sessionService.userChange.subscribe((user: User) => {
      this.hasUser = !!user;
    })
    this.isOnline = this._offlineService.isOnline;
  }

  ngOnInit(): void { }

  public toggleOnline() {
    this.isOnline = !this.isOnline;
    this._offlineService.turn(this.isOnline);
  }

}
