import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class TokenStorage {

  public getAccessToken(): Observable<string> {
    const token: string = localStorage.getItem('accessToken');
    return of(token);
  }

  public getRefreshToken(): Observable<string> {
    const token: string = localStorage.getItem('refreshToken');
    return of(token);
  }


  public getUserRoles(): Observable<any> {
    const roles: any = localStorage.getItem('userRoles');
    try {
      return of(JSON.parse(roles));
    } catch (e) {}
  }

  public getUsername(): string {
    return localStorage.getItem('username');
  }

  public setAccessToken(token: string): TokenStorage {
    localStorage.setItem('accessToken', token);

    return this;
  }


  public setRefreshToken(token: string): TokenStorage {
    localStorage.setItem('refreshToken', token);

    return this;
  }

  public saveUsername(username: string): TokenStorage {
    localStorage.setItem('username', username);
    return this;
  }

  public setUserRoles(roles: any): any {
    if (roles != null) {
      localStorage.setItem('userRoles', JSON.stringify(roles));
    }

    return this;
  }

	/**
	 * Remove tokens
	 */
  public clear() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
  }
}
