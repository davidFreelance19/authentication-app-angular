import { inject, } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, tap, } from 'rxjs';
import { AuthService } from '../services/auth.service';

const isValidToken = (params: string, path: string): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.validateTokenSentByEmail(params, path)
    .pipe(
      tap(isValidToken => {
        if (!isValidToken) router.navigate(['./auth/login']);
      })
    )
};

export const activeIsValidToken: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return isValidToken(route.params['token'], route.url[1].path)
};
