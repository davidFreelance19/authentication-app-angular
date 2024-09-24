import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { SharedButtonComponent } from './components/button/button.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    Error404PageComponent,
    SharedButtonComponent,
    FormFieldComponent,
  ],
  exports: [
    Error404PageComponent,
    SharedButtonComponent,
    FormFieldComponent,
  ],
})
export class SharedModule { }
