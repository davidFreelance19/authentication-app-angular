import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyAccountPageComponent } from './pages/verify-account/verify-account-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SingInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { RecupereAccountPageComponent } from './pages/recupere-account-page/recupere-account-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { ChangePasswordPageComponent } from './pages/change-password-page/change-password-page.component';
import { activeIsValidToken } from './guards/is-valid-token-sent-by-email.guard';
import { NewCodeVerifyAccountComponent } from './pages/new-code-verify-account/new-code-verify-account.component';
import { activeIsValidTokenNewCodeVerifyAccount } from './guards/new-code-verify-account.guard';


const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'sign-in',
        component: SingInPageComponent
      },
      {
        path: 'sign-up',
        component: SignUpPageComponent
      },
      {
        path: 'view/verify-account/:token',
        component: VerifyAccountPageComponent,
        canActivate: [activeIsValidToken]
      },
      {
        path: 'new-code/verify-account/:token',
        component: NewCodeVerifyAccountComponent,
        canActivate: [activeIsValidTokenNewCodeVerifyAccount]
      },
      {
        path: 'recupere-account',
        component: RecupereAccountPageComponent
      },
      {
        path: 'view/change-password/:token',
        component: ChangePasswordPageComponent,
        canActivate: [activeIsValidToken]
      },
      {
        path: '**',
        redirectTo: 'sign-in'
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
