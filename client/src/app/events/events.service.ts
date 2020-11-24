import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from "../core/services/session.service";

@Injectable()
export class EventsService {

  constructor(private _http: HttpClient, private _sessionService: SessionService) { }

  public index(): Observable<any> {
    return this._http.get('http://localhost:8030/events/index');
  }

  public subscribe(eventId: number): Observable<any> {
    return this._http.post('http://localhost:8040/subscriptions/create', {
      user_id: this._sessionService.user.id,
      event_id: eventId,
    });
  }

}
