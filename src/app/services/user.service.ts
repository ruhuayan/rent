import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  public register(data): Observable<any> {
    return this.http.post(API_URL + '/register', data, httpOptions);
  }

  public login(data): Observable<any> {
    return this.http.post(API_URL + '/login', data, httpOptions);
  }

  forgetPassword(data) {
    return this.http.post( API_URL + '/forget/', data, httpOptions);
  }

  resetPassword(data) {
    return this.http.post( API_URL + '/resetPassword/', data, httpOptions);
  }
}
