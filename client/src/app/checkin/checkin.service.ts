import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from "../core/services/session.service";

@Injectable()
export class CheckinService {

  constructor(private _http: HttpClient, private _sessionService: SessionService) { }

  public list(eventId: number): Observable<any> {
    return this._http.get('http://177.44.248.86/api/subscriptions/list?event_id=' + eventId);
  }

  public checkin(data:any): Observable<any> {
    return this._http.post('http://177.44.248.86/api/checkin', data);
  }

}
