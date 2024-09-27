import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ValidatorsAuthService } from '../../services/validatorsAuth.service';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'auth-sign-up-page',
  templateUrl: './sign-up-page.component.html',
})
export class SignUpPageComponent {

  iconOneVisibility: boolean = false;
  isLoading: boolean = false; 
  readonly toast = toast;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private authValidator: ValidatorsAuthService,
    private validatorsService: ValidatorsService
  ) { }

  newAccountForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.pattern(this.authValidator.emailPattern)]],
    password: [
      "", 
      [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern(this.validatorsService.passwordPattern)]
    ],
    name: [
      "", 
      [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(this.validatorsService.namePattern)]
    ],
    lastname: [
      "", 
      [Validators.required, Validators.minLength(2),Validators.maxLength(50), Validators.pattern(this.validatorsService.lastnamePattern)]
    ],
  }, {
    updateOn: 'submit',
  });

  onSubmit(): void {
 
    if (this.newAccountForm.invalid) {
      this.newAccountForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;

    const email = this.newAccountForm.controls['email'].value;
    const password = this.newAccountForm.controls['password'].value;
    const name = this.newAccountForm.controls['name'].value;
    const lastname = this.newAccountForm.controls['lastname'].value;

    this.authService.registerAccount(email, password, name, lastname)
      .subscribe({
        next: () => {
          this.isLoading = false; 
          this.newAccountForm.reset();         
          toast.success('Account created successfully',
            {
              description: 'Check your email and verify your account.'
            }
          );
        },
        error: (error) => {
          this.isLoading = false;
          this.authValidator.handleFormErrorByAPI(this.newAccountForm, error);
        }
      })
  }
  onIconVisibilityChange(newVisibility: boolean): void {
    this.iconOneVisibility = newVisibility;
  }
}
