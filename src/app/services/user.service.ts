import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  // public register(data): Observable<any> {
  //   return this.http.post(API_URL + '/register', data, httpOptions);
  // }

  // public login(data): Observable<any> {
  //   return this.http.post(API_URL + '/login', data, httpOptions);
  // }

  forgetPassword(data) {
    return this.http.post( API_URL + '/forget/', data, httpOptions);
  }

  resetPassword(data) {
    return this.http.post( API_URL + '/resetPassword/', data, httpOptions);
  }

  getAccount(data) {
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${data}`})
    };
    return this.http.get(API_URL + '/user/3', options);
  }
}
