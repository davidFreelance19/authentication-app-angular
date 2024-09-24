import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyAccountPageComponent } from './pages/verify-account/verify-account-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SingInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { RecupereAccountPageComponent } from './pages/recupere-account-page/recupere-account-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { ChangePasswordPageComponent } from './pages/change-password-page/change-password-page.component';


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
        path: 'verify-account/:token',
        component: VerifyAccountPageComponent,
      },
      {
        path: 'recupere-account',
        component: RecupereAccountPageComponent
      },
      {
        path: 'change-password/:token',
        component: ChangePasswordPageComponent,
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
