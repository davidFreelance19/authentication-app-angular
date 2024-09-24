import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map, catchError, throwError, of } from 'rxjs';
import { environments } from '../../../env/env';
import { User } from '../../shared/interfaces/user.interface';

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


  registerAccount(email: string, password: string): Observable<boolean> {
    return this.http.post<User>(`${this.baseUrl}/auth/new-account`, { email: email, password: password })
      .pipe(
        map(({ user }) => !!user),
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
    return this.http.post<User>(`${this.baseUrl}/auth/recupere-account`, { email: email })
      .pipe(
        map(({ user }) => !!user),
        catchError(err => throwError(() => err.error.error))
      )
  }

  generateNewCode(path: string, email: string): Observable<boolean> {
    return this.http.post<User>(`${this.baseUrl}/auth/${path}`, { email: email })
      .pipe(
        map(({ user }) => !!user),
        catchError(err => throwError(() => err.error.error))
      )
  }

  validateOTPCode(code: string, path: string, token: string): Observable<boolean> {
    return this.http.post<User>(`${this.baseUrl}/auth/${path}/${token}`, { code })
      .pipe(
        map(({ user }) => !!user),
        catchError(err => throwError(() => err.error.error))
      )
  }

  resetPassword(password: string, repeatPassword: string, token: string) {
    return this.http.post<User>(`${this.baseUrl}/auth/reset-password/${token}`, { password, repeatPassword })
      .pipe(
        map(({ user }) => !!user),
        catchError(err => throwError(() => err.error.error))
      )
  }

  validateToken(token: string, path: string): Observable<boolean> {
    return this.http.get<User>(`${this.baseUrl}/auth/${path}/${token}`)
      .pipe(
        map(({ user }) => !!user),
        catchError(() => of(false))
      );
  }

  auth(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) return of(false);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<User>(`${this.baseUrl}/auth/`, { headers })
      .pipe(
        map(({ user }: User) => {
          this.user = { user }
          return !!user
        }),
        catchError(() => of(false))
      )
  }

}
