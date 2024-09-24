import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { AuthService } from '../../services/auth.service';
import { ValidatorsAuthService } from '../../services/validatorsAuth.service';

@Component({
  selector: 'auth-recupere-account-page',
  templateUrl: './recupere-account-page.component.html',
})
export class RecupereAccountPageComponent {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private customValidator: ValidatorsService,
    private authValitors: ValidatorsAuthService
  ) { }

  public recupereAccountForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.pattern(this.authValitors.emailPattern)]]
  }, { updateOn: 'submit', });

  isInvalidField(field: string) {
    return this.customValidator.isInvalidField(this.recupereAccountForm, field);
  }

  errorsField(field: string): string | null {
    return this.authValitors.getFieldError(this.recupereAccountForm, field);
  }

  public onSubmit(): void {
    if (this.recupereAccountForm.invalid) {
      this.recupereAccountForm.markAllAsTouched();
      return;
    }

    const email = this.recupereAccountForm.controls['email'].value;
    this.authService.recupereAccount(email)
      .subscribe({
        next: () => {
          this.recupereAccountForm.reset();
        },
        error: (error) => this.authValitors.handleFormError(this.recupereAccountForm, error)
      })
  }
}
