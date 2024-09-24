import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { AuthService } from '../../services/auth.service';
import { ValidatorsAuthService } from '../../services/validatorsAuth.service';

@Component({
  selector: 'auth-sign-up-page',
  templateUrl: './sign-up-page.component.html',
})
export class SignUpPageComponent {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private customValidator: ValidatorsService,
    private authValidator: ValidatorsAuthService
  ) { }

  public newAccountForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.pattern(this.authValidator.emailPattern)]],
    password: ["", [Validators.required, Validators.minLength(8)]],
    name: ["", [Validators.required, Validators.minLength(3)]],
    lastname: ["", [Validators.required, Validators.minLength(3)]],
    repeatPassword: ["", [Validators.required, Validators.minLength(8)]],
  }, {
    updateOn: 'submit',
    validators: [
      this.customValidator.isFieldOneEqualFieldTwo('password', 'repeatPassword')
    ]
  });

  isInvalidField(field: string) {
    return this.customValidator.isInvalidField(this.newAccountForm, field);
  }

  errorsField(field: string): string | null {
    return this.authValidator.getFieldError(this.newAccountForm, field);
  }

  public onSubmit(): void {
    if (this.newAccountForm.invalid) {
      this.newAccountForm.markAllAsTouched();
      return;
    }

    const email = this.newAccountForm.controls['email'].value;
    const password = this.newAccountForm.controls['password'].value;

    this.authService.registerAccount(email, password)
      .subscribe({
        next: () => {
          this.newAccountForm.reset();
        },
        error: (error) => this.authValidator.handleFormError(this.newAccountForm, error)
      })
  }

}
