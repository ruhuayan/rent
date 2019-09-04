import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subject, Observable, from, of, BehaviorSubject } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { TokenStorage } from './token-storage.service';
import { Credential } from './credential.model';
import { AuthService } from 'ngx-auth';
// import { SubjectService } from '../services/subject.service';

const API_URL = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthenticationService implements AuthService {
  username$: Subject<string>;
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    ) {
      this.username$ = new BehaviorSubject(this.tokenStorage.getUsername());
    }

    public isAuthorized(): Observable<boolean> {
      return this.tokenStorage.getAccessToken().pipe(map(token => !!token));
    }

    public getAccessToken(): Observable<string> {
      return this.tokenStorage.getAccessToken();
    }

    public getUserRoles(): Observable<any> {
      return this.tokenStorage.getUserRoles();
    }

    public register(credential: Credential): Observable<any> {
      return this.http.post(`${API_URL}/user/register`, credential, httpOptions);
        // .pipe(catchError(this.handleError('register', [])));
    }

    public login(credential: Credential): Observable<any> {
      return this.http.post<AccessData>(`${API_URL}/token/`, credential).pipe(
        map((result: any) => {
          this.tokenStorage.saveUsername(credential.username);
          this.username$.next(credential.username);
          if (result instanceof Array) {
            return result.pop();
          }
          return result;
        }),
        tap(this.saveAccessData.bind(this)),
        // catchError(this.handleError('login', []))
      );
    }

    public logout(refresh?: boolean): void {
      this.tokenStorage.clear();
      this.username$.next(null);
      if (refresh) {
        location.reload(true);
      }
    }

    public requestPassword(credential: Credential): Observable<any> {
      return this.http.post<AccessData>(`${API_URL}/forgot`, credential, httpOptions)
        .pipe(catchError(this.handleError('forgot-password', []))
      );
    }

    public refreshToken(): Observable<any> {
      return this.tokenStorage.getRefreshToken().pipe(
        switchMap((refreshToken: string) => {
          return this.http.post<AccessData>(`${API_URL}/refresh`, refreshToken, httpOptions);
        }),
        tap(this.saveAccessData.bind(this)),
        catchError(err => {
          this.logout();
          return err;
        })
      );
    }

    public verifyTokenRequest(url: string): boolean {
      return url.endsWith('refresh-token');
    }

    public refreshShouldHappen(response: HttpErrorResponse): boolean {
      return response.status === 401;
    }

    private saveAccessData(accessData: AccessData) {
      if (typeof accessData !== 'undefined') {
        this.tokenStorage
          .setAccessToken(accessData.access)
          .setRefreshToken(accessData.refresh);
          // .setUserRoles(accessData.roles);
        // this.onCredentialUpdate$.next(accessData);
      }
    }
    private handleError<T>(operation = 'operation', result?: any) {
      return (error: any): Observable<any> => {
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // Let the app keep running by returning an empty result.
        return of(error);
      };
    }
}

export interface AccessData {
  access: string;
  refresh: string;
}
