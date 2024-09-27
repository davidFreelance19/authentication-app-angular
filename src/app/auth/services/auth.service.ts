import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError, of } from 'rxjs';
import { environments } from '../../../env/env';
import { User, UserResponse } from '../../shared/interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = environments.apiUrl;
  public user: User | undefined;

  constructor(
    private http: HttpClient,
  ) { }


  private setAuthentication(token: string): boolean {
    localStorage.setItem('token', token);
    return true;
  }


  registerAccount(email: string, password: string, name: string, lastname: string): Observable<boolean> {
    return this.http.post<User>(`${this.baseUrl}/auth/register`, { email, password, name, lastname })
      .pipe(
        map(( user ) => !!user),
        catchError(err => throwError(() => err.error.error))
      )
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/auth/login`, { email: email, password: password })
      .pipe(
        map(({ token }) => this.setAuthentication(token)),
        catchError(err => throwError(() => err.error.error))
      )
  }

  recupereAccount(email: string): Observable<boolean> {
    return this.http.post<{ message: string}>(`${this.baseUrl}/auth/recupere-account`, { email: email })
      .pipe(
        map(({ message }) => !!message),
        catchError(err => throwError(() => err.error.error))
      )
  }

  verifyAccount(code: string, token: string): Observable<boolean> {
    return this.http.patch<{message: string}>(`${this.baseUrl}/auth/verify-account/${token}`, { code })
      .pipe(
        map(({ message }) => !!message),
        catchError(err => throwError(() => err.error.error))
      )
  }

  identityVerification(code: string, token: string): Observable<boolean> {
    return this.http.get<{message: string}>(`${this.baseUrl}/auth/change-password/${token}?code=${code}`)
      .pipe(
        map(({ message }) => !!message),
        catchError(err => throwError(() => err.error.error))
      )
  }
  resetPassword(password: string, code: string, token: string) {
    return this.http.patch<{message: string}>(`${this.baseUrl}/auth/change-password/${token}?code=${code}`, { password })
      .pipe(
        map(({ message }) => !!message),
        catchError(err => throwError(() => err.error.error))
      )
  }

  validateTokenSentByEmail(token: string, path: string): Observable<boolean> {
    return this.http.get<{message: string}>(`${this.baseUrl}/auth/view/${path}/${token}`)
      .pipe(
        map(({ message }) => !!message),
        catchError(() => of(false))
      );
  }

  newCodeVerifyToken(token: string): Observable<boolean> {
    return this.http.get<{message: string}>(`${this.baseUrl}/auth/new-code/${token}`)
      .pipe(
        map(({ message }) => !!message),
        catchError(() => of(false))
      );
  }

  auth(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) return of(false);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<UserResponse>(`${this.baseUrl}/app/home`, { headers })
      .pipe(
        map((response: UserResponse) => {
          this.user = response.user;
          return !!response
        }),
        catchError(() => of(false))
      )
  }

}
