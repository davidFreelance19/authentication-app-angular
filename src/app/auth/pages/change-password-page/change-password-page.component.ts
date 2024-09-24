import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorsAuthService } from '../../services/validatorsAuth.service';

@Component({
  selector: 'auth-change-password-page',
  templateUrl: './change-password-page.component.html',
})
export class ChangePasswordPageComponent implements OnInit {
  private token: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private customValidator: ValidatorsService,
    private authValidator: ValidatorsAuthService
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') ?? '';
  }

  public resetPasswordForm: FormGroup = this.fb.group({
    password: ["", [Validators.required, Validators.minLength(8)]],
    repeatPassword: ["", [Validators.required, Validators.minLength(8)]],
  }, {
    updateOn: 'submit',
    validators: [
      this.customValidator.isFieldOneEqualFieldTwo('password', 'repeatPassword')
    ]
  });

  isInvalidField(field: string) {
    return this.customValidator.isInvalidField(this.resetPasswordForm, field);
  }

  errorsField(field: string): string | null {
    return this.authValidator.getFieldError(this.resetPasswordForm, field);
  }

  public onSubmit(): void {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }
    const password = this.resetPasswordForm.controls['password'].value;
    const repeatPassword = this.resetPasswordForm.controls['repeatPassword'].value;

    this.authService.resetPassword(password, repeatPassword, this.token)
      .subscribe({
        next: () => {
          this.resetPasswordForm.reset();
          this.router.navigateByUrl('/auth/login');
        },
        error: (error) => { }
      })
  }
}
