import { EventEmitter, Injectable, Output } from '@angular/core';
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root',
})
export class SessionService {

  public user: User | null;
  public jwt: {token: string, expires: number} | null;

  @Output()
  public userChange: EventEmitter<User | null> = new EventEmitter<User | null>();

  public constructor() {
    const user = localStorage.getItem('user');
    const jwt = localStorage.getItem('jwt');
    if(user) {
      this.user = JSON.parse(user);
    }
    if(jwt) {
      this.jwt = JSON.parse(jwt);
    }
  }

  public clear(): void {
    this.user = null;
    this.jwt = null;
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
    this.userChange.emit(null);
  }

  public setUser(user: User): void {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(this.user))
    this.userChange.emit(this.user);
  }

  public setToken(jwt: {token: string, expires: number}): void {
    this.jwt = jwt;
    localStorage.setItem('jwt', JSON.stringify(this.jwt))
    this.setUserFromPayload(jwt.token);
  }

  private setUserFromPayload(token): void {
    const user = <User>JSON.parse(atob(token.split('.')[1]));
    this.setUser(user);
  }

}
