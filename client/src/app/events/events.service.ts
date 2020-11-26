import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from "../core/services/session.service";
import { environment } from "../../environments/environment";

@Injectable()
export class EventsService {

  constructor(private _http: HttpClient, private _sessionService: SessionService) { }

  public index(): Observable<any> {
    return this._http.get(environment.api + 'events/index');
  }

  public subscribe(eventId: number): Observable<any> {
    return this._http.post(environment.api + 'subscriptions/create', {
      user_id: this._sessionService.user.id,
      event_id: eventId,
    });
  }

}
