import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ValidatorsAuthService } from '../../services/validatorsAuth.service';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'auth-verify-account-page',
  templateUrl: './verify-account-page.component.html',
})
export class VerifyAccountPageComponent implements OnInit {
  readonly toast = toast;
  private token: string = '';
  isLoading: boolean = false; 

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private authValidator: ValidatorsAuthService,
    private customValidator: ValidatorsService
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') ?? '';
  }

  public verifyAccount: FormGroup = this.fb.group({
    code: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(5)]]
  });

  isInvalidField(field: string): boolean | null {
    return this.customValidator.isInvalidField(this.verifyAccount, field);
  }

  errorsField(field: string): string | null {
    return this.customValidator.getFieldErrorByForm(this.verifyAccount, field) ?? 
      this.authValidator.getFieldErrorByAPI(this.verifyAccount, field);
  }

  onSubmit(): void {
    if (this.verifyAccount.invalid) {
      this.verifyAccount.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const code = this.verifyAccount.controls['code'].value;
    
    this.authService.verifyAccount(code, this.token)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.verifyAccount.reset();
          this.router.navigateByUrl(`auth/sign-in`);
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
  }
}
