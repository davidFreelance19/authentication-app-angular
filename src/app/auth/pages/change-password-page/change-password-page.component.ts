import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { ValidatorsAuthService } from '../../services/validatorsAuth.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'auth-change-password-page',
  templateUrl: './change-password-page.component.html',
})
export class ChangePasswordPageComponent implements OnInit {
  readonly toast = toast;

  iconOneVisibilityNewPassword: boolean = false;
  iconOneVisibilityRepeatPassword: boolean = false;

  identityVerification: boolean = true;
  isLoading: boolean = false;
  changePasswordSuccess: boolean = false;

  private token: string = '';
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private authValidator: ValidatorsAuthService,
    private customValidator: ValidatorsService
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') ?? '';
  }

  private readonly CODE_VALIDATORS = [
    Validators.required, 
    Validators.minLength(5), 
    Validators.maxLength(5)
  ];

  private readonly PASSWORD_VALIDATORS = [
    Validators.required, 
    Validators.minLength(6), 
    Validators.maxLength(20), 
    Validators.pattern(this.customValidator.passwordPattern)
  ];

  identityVerificationForm: FormGroup = this.fb.group({
    code: ["", this.CODE_VALIDATORS],
  }, { updateOn: 'submit' });

  resetPasswordForm: FormGroup = this.fb.group({
    password: ["", this.PASSWORD_VALIDATORS],
    repeatPassword: ["", this.PASSWORD_VALIDATORS],
  }, { updateOn: 'submit', validators: this.customValidator.passwordMatchValidator('password', 'repeatPassword') });

  errorsFieldIdentityVerification(field: string): string | null { 
    return this.customValidator.getFieldErrorByForm(this.identityVerificationForm, field) ?? 
    this.authValidator.getFieldErrorByAPI(this.identityVerificationForm, field); 
  }

  isInvalidFieldIdentityVerification(field: string): boolean | null { 
    return this.customValidator.isInvalidField(this.identityVerificationForm, field); 
  }

  onIconVisibilityChangeNewPassword(newVisibility: boolean): void {
    this.iconOneVisibilityNewPassword = newVisibility;
  }

  onIconVisibilityChangeRepeatPassword(newVisibility: boolean): void {
    this.iconOneVisibilityRepeatPassword = newVisibility;
  }

  private handleFormSubmission(form: FormGroup, callback: () => void): void {
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }
    callback();
  }

   onSubmitChangePassword(): void {
    this.handleFormSubmission(this.resetPasswordForm, () => {
      const password = this.resetPasswordForm.controls['password'].value;
      const code = this.identityVerificationForm.controls['code'].value;

      this.isLoading= true;
      this.authService.resetPassword(password, code, this.token)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.resetPasswordForm.reset();
            this.changePasswordSuccess = true;
          },
          error: (error) => { 
            this.isLoading = false;
            toast.error('Invalid code.',
              {
                description: 'Check your code and expiration time.'
              }
            );
          }
        });
    });
  }

   onSubmitIdentityVerification(): void {
    this.handleFormSubmission(this.identityVerificationForm, () => {
      const code = this.identityVerificationForm.controls['code'].value;
      this.isLoading= true;
      
      this.authService.identityVerification(code, this.token)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.identityVerification = true;
          },
          error: (error) => {
            this.isLoading = false;
            toast.error('Invalid code.',
              {
                description: 'Check your code and expiration time.'
              }
            );
           }
        });
    });
  }
}