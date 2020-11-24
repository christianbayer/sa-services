import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  private _api: string = ''

  constructor(private http: HttpClient) { }

  public login(data: {email: string, password: string}): Observable<any> {
    return this.http.post('http://localhost:8010/login', data);
  }

  public register(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Accept-type', 'application/json');
    return this.http.post('http://localhost:8020/users/store', data, {headers:headers});
  }

}
