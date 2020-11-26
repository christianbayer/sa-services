import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(data: {email: string, password: string}): Observable<any> {
    return this.http.post(environment.api + 'auth/login', data);
  }

  public register(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Accept-type', 'application/json');
    return this.http.post(environment.api + 'users/store', data, {headers: headers});
  }

}
