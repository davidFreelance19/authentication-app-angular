import { inject, } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, tap, } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

const isAuthtenticatedGuard = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.auth()
    .pipe(
      tap(isAuth => {
        if (!isAuth) router.navigate(['./auth']);
      })
    )
};

export const activePrivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return isAuthtenticatedGuard();
};