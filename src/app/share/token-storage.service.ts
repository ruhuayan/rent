import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Token } from './token.interface';

@Injectable()
export class TokenStorage {

  public getToken(): Observable<Token> {
    const token: Token = JSON.parse(localStorage.getItem('token'));
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

  public setAccessToken(token: Token): TokenStorage {
    localStorage.setItem('token', JSON.stringify(token));

    return this;
  }


  // public setRefreshToken(token: string): TokenStorage {
  //   localStorage.setItem('refreshToken', token);

  //   return this;
  // }

  // public saveUsername(username: string): TokenStorage {
  //   localStorage.setItem('username', username);
  //   return this;
  // }

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
    localStorage.removeItem('token');
  }
}
