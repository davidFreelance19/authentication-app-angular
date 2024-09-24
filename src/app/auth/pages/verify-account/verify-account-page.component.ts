import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ValidatorsService } from '../../../shared/service/validators.service';
import { AuthService } from '../../services/auth.service';
import { ValidatorsAuthService } from '../../services/validatorsAuth.service';

@Component({
  selector: 'auth-verify-account-page',
  templateUrl: './verify-account-page.component.html',
})
export class VerifyAccountPageComponent implements OnInit {

  public title: string = '';
  public description: string = '';
  public value : any;
  private token: string = '';
  private path: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private customValidator: ValidatorsService,
    private authValidator: ValidatorsAuthService
  ) { }

  routeData: { [key: string]: { title: string; description: string; } } = {
    'auth-reset-password': {
      title: 'Verification',
      description: 'Provide the OTP code for verification of your person.'
    },
    'verify-account': {
      title: 'Confirm account',
      description: 'Provide the OTP code to confirm your account.'
    }
  };

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') ?? '';
    this.path = this.route.snapshot.url[0].path ?? '';

    const routeInfo = this.routeData[this.path];

    this.title = routeInfo.title;
    this.description = routeInfo.description;
  }

  public confirmOTPCodeForm: FormGroup = this.fb.group({
    otpCode: ["", Validators.required]
  });


  isInvalidField(field: string) {
    return this.customValidator.isInvalidField(this.confirmOTPCodeForm, field);
  }

  errorsField(field: string): string | null {
    return this.authValidator.getFieldError(this.confirmOTPCodeForm, field);
  }

  public onSubmit(): void {

    if (this.confirmOTPCodeForm.invalid) {
      this.confirmOTPCodeForm.markAllAsTouched();
      return;
    }
    const odtCode = this.confirmOTPCodeForm.controls['otpCode'].value;

    this.authService.validateOTPCode(odtCode, this.path, this.token)
      .subscribe({
        next: () => {
          if (this.path === 'auth-reset-password') this.router.navigateByUrl(`auth/reset-password/${this.token}`);
          if(this.path === 'verify-account') this.router.navigateByUrl(`auth/login`);
          this.confirmOTPCodeForm.reset()
        },
        error: (error) => this.authValidator.handleFormError(this.confirmOTPCodeForm, error)
      })
  }

}
