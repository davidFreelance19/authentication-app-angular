import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { InputOtpModule } from 'primeng/inputotp';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

import { VerifyAccountPageComponent } from './pages/verify-account/verify-account-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SingInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { RecupereAccountPageComponent } from './pages/recupere-account-page/recupere-account-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { ChangePasswordPageComponent } from './pages/change-password-page/change-password-page.component';

import { NavigationAuthComponent } from './components/navigation-auth.component';
import { TitleComponent } from './components/title-auth.component';

@NgModule({
  declarations: [
    LayoutPageComponent,

    //Pages
    VerifyAccountPageComponent,
    SingInPageComponent,
    RecupereAccountPageComponent,
    SignUpPageComponent,
    ChangePasswordPageComponent,

    // Components
    NavigationAuthComponent,
    TitleComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedModule,
    InputOtpModule
  ]
})
export class AuthModule { }
