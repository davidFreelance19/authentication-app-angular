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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private authValidator: ValidatorsAuthService
  ) { }

  public loginForm: FormGroup = this.fb.group(
    {
      email: ["", [Validators.required, Validators.pattern(this.authValidator.emailPattern)]],
      password: ["", [Validators.required], []]
    }, { updateOn: 'submit', }
  );

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;

    this.authService.login(email, password)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/admin');
        },
        error: (error) => this.authValidator.handleFormError(this.loginForm, error)
      })
  }
}
