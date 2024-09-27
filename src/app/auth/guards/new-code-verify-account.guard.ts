import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, tap, } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

const isValidToken = (params: string): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.newCodeVerifyToken(params)
    .pipe(
      tap(isValidToken => {
        if (!isValidToken) router.navigate(['./auth/login']);
      })
    )
};

export const activeIsValidTokenNewCodeVerifyAccount: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return isValidToken(route.params['token'])
};
