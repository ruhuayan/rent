import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { TokenStorage } from './token-storage.service';
import { Credential } from '../auth/credential.model';
import { AuthService } from 'ngx-auth';
import { SharedService } from './shared.service';
import { Token } from './token.interface';

const API_URL = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthenticationService implements AuthService {

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private sharedService: SharedService,
    // private store: Store<IAuthState>
    ) {
    }

    public isAuthorized(): Observable<boolean> {
      return this.tokenStorage.getToken().pipe(map(token => !!token));
    }

    public getAccessToken(): Observable<string> {
      return this.tokenStorage.getToken().pipe(map(token => token.access));
    }

    // public getUserRoles(): Observable<any> {
    //   return this.tokenStorage.getUserRoles();
    // }

    public register(credential: Credential): Observable<any> {
      return this.http.post(`${API_URL}/user/register`, credential, httpOptions);
        // .pipe(catchError(this.handleError('register', [])));
    }

    public login(credential: Credential): Observable<any> {
      return this.http.post<Token>(`${API_URL}/token/`, credential).pipe(
        map((result: any) => {
          this.sharedService.username$.next(credential.username);
          if (result instanceof Array) {
            return result.pop();
          }
          return {...result, name: credential.username};
        }),
        tap(this.saveAccessData.bind(this)),
        // catchError(this.handleError('login', []))
      );
    }

    public logout(refresh?: boolean): void {
      this.tokenStorage.clear();
      this.sharedService.username$.next(null);
      // this.store.dispatch(new authActions.Logout());
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
      return this.tokenStorage.getToken().pipe(
        switchMap((token: Token) => {
          return this.http.post<AccessData>(`${API_URL}/refresh`, token.refresh, httpOptions);
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

    private saveAccessData(accessData: Token) {
      if (typeof accessData !== 'undefined') {
        this.tokenStorage
          .setAccessToken(accessData);
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
