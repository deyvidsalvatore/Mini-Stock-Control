import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ISignupUserRequest } from '../../shared/interfaces/signup-user.request';
import { catchError, Observable, take, throwError } from 'rxjs';
import { ISignupUserResponse } from '../../shared/interfaces/signup-user.response';
import { IAuthRequest } from '../../shared/interfaces/auth.request';
import { IAuthResponse } from '../../shared/interfaces/auth.response';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient, private cookie: CookieService) {}

  signupUser(signupData: ISignupUserRequest): Observable<ISignupUserResponse> {
    return this.http
      .post<ISignupUserResponse>(`${this.API_URL}/user`, signupData)
      .pipe(take(1), catchError(this.handleError));
  }

  authUser(authData: IAuthRequest): Observable<IAuthResponse> {
    return this.http
      .post<IAuthResponse>(`${this.API_URL}/auth`, authData)
      .pipe(take(1), catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code: ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }

  isLoggedIn(): boolean {
    return this.cookie.check('USER_INFO');
  }
}
