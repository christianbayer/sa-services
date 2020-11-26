import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from "../core/services/session.service";
import { environment } from "../../environments/environment";

@Injectable()
export class CheckinService {

  constructor(private _http: HttpClient, private _sessionService: SessionService) { }

  public list(eventId: number): Observable<any> {
    return this._http.get(environment.api + 'subscriptions/list?event_id=' + eventId);
  }

  public checkin(data: any): Observable<any> {
    return this._http.post(environment.api + 'checkin', data);
  }

}
