import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from "../core/services/session.service";
import { environment } from "../../environments/environment";

@Injectable()
export class SubscriptionsService {

  constructor(private _http: HttpClient, private _sessionService: SessionService) { }

  public list(): Observable<any> {
    return this._http.get(environment.api + 'subscriptions/list?user_id=' + this._sessionService.user.id);
  }

  public unsubscribe(eventId: number): Observable<any> {
    return this._http.post(environment.api + 'subscriptions/delete', {
      event_id: eventId,
      user_id: this._sessionService.user.id
    });
  }

}
