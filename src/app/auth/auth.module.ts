import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputOtpModule } from 'primeng/inputotp';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

import { VerifyAccountPageComponent } from './pages/verify-account/verify-account-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SingInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { RecupereAccountPageComponent } from './pages/recupere-account-page/recupere-account-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { ChangePasswordPageComponent } from './pages/change-password-page/change-password-page.component';
import { NewCodeVerifyAccountComponent } from './pages/new-code-verify-account/new-code-verify-account.component';

import { NavigationAuthComponent } from './components/navigation-auth.component';
import { TitleComponent } from './components/title-auth.component';
import { OperationSuccessComponent } from './components/operation-success/operation-success.component';
import { NgxSonnerToaster } from 'ngx-sonner';


@NgModule({
  declarations: [
    LayoutPageComponent,

    //Pages
    VerifyAccountPageComponent,
    SingInPageComponent,
    RecupereAccountPageComponent,
    SignUpPageComponent,
    ChangePasswordPageComponent,
    NewCodeVerifyAccountComponent,

    // Components
    NavigationAuthComponent,
    TitleComponent,
    OperationSuccessComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedModule,
    InputOtpModule,
    FormsModule,
    NgxSonnerToaster
  ]
})
export class AuthModule { }
