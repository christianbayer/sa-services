import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class OfflineService {

  private _connectionChanged = new Subject<boolean>();
  private _online: boolean = true;

  constructor() {
    window.addEventListener('online', () => this.updateOnlineStatus());
    window.addEventListener('offline', () => this.updateOnlineStatus());
    this._online = localStorage.getItem('online') === '1' || localStorage.getItem('online') === null;
  }

  get connectionChanged(): Observable<boolean> {
    return this._connectionChanged.asObservable();
  }

  get isOnline() {
    return this._online // !!window.navigator.onLine;
  }

  private updateOnlineStatus() {
    this._connectionChanged.next(window.navigator.onLine);
  }

  public turn(online: boolean) {
    localStorage.setItem('online', online ? '1' : '0');
    this._online = online;
    this._connectionChanged.next(online);
  }
}
