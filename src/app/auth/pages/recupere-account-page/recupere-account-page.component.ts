import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ValidatorsAuthService } from '../../services/validatorsAuth.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'auth-recupere-account-page',
  templateUrl: './recupere-account-page.component.html',
})
export class RecupereAccountPageComponent {

  isLoading: boolean = false; 
  readonly toast = toast;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private authValitors: ValidatorsAuthService
  ) { }

  recupereAccountForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.pattern(this.authValitors.emailPattern)]]
  }, { updateOn: 'submit', });

  onSubmit(): void {
    if (this.recupereAccountForm.invalid) {
      this.recupereAccountForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const email = this.recupereAccountForm.controls['email'].value;
    this.authService.recupereAccount(email)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.recupereAccountForm.reset();
          toast.success('Code sent successfully.',
            {
              description: 'Check your email and follow the instructions.'
            }
          );
        },
        error: (error) => {
          this.isLoading = false;
          this.authValitors.handleFormErrorByAPI(this.recupereAccountForm, error);
        }
      })
  }
}
