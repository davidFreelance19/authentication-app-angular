import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ValidatorsAuthService } from '../../services/validatorsAuth.service';


@Component({
  selector: 'auth-sign-in-page',
  templateUrl: './sign-in-page.component.html',
})
export class SingInPageComponent {

  iconOneVisibility: boolean = false;
  isLoading: boolean = false; 
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private authValidator: ValidatorsAuthService
  ) { }

  loginForm: FormGroup = this.fb.group(
    {
      email: ["", [Validators.required, Validators.pattern(this.authValidator.emailPattern)]],
      password: ["", [Validators.required]]
    }, { updateOn: 'submit', }
  );

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;

    this.authService.login(email, password)
      .subscribe({
        next: () => {
          this.isLoading = false; 
          this.router.navigateByUrl('/app');
        },
        error: (error) => {
          this.isLoading = false; 
          this.authValidator.handleFormErrorByAPI(this.loginForm, error);
        }
      })
  }

  onIconVisibilityChange(newVisibility: boolean): void {
    this.iconOneVisibility = newVisibility;
  }
}
