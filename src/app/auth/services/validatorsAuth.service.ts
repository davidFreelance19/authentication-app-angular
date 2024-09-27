import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { toast } from 'ngx-sonner';

@Injectable({ providedIn: 'root' })
export class ValidatorsAuthService {
  protected readonly toast = toast;

  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  private errorMessages: { [key: string]: string } = {
    'emailTaken': 'Email already taken',
    'passwordIncorrect': 'Password incorrect',
    'userNotExists': 'User not exists',
    'notVerfied': 'Account is not verified',
    'alreadyVerified': 'Account already verified',
    'alreadyCode': 'You already have code, check your email',
    'codeIncorrect': 'Code incorrect'
  };

  getFieldErrorByAPI(form: FormGroup, field: string): string | null {
    const control = form.controls[field];
    if (!control) return null;

    const errors = control.errors || {};
    for (const key of Object.keys(errors)) {
      const errorMessage = this.errorMessages[key];
      return errorMessage;
    }
    return null;
  }

  handleFormErrorByAPI(form: FormGroup, error: string) {
    const errorMap: { [key: string]: string } = {
      'User not exists': 'userNotExists',
      'User with this email already exists': 'emailTaken',
      'Account already verified': 'alreadyVerified',
      'Account is not verified': 'notVerfied',
      'You already have code, check your email': 'alreadyCode',
      'Invalid email or password': 'passwordIncorrect',
      'Invalid code': 'codeIncorrect'
    };

    const errorKey = errorMap[error];
    if (errorKey) {
      if (errorKey === 'passwordIncorrect') {
        form.controls['password'].setErrors({ [errorKey]: true });
      }else if (errorKey === 'codeIncorrect') {
        form.controls['code'].setErrors({ [errorKey]: true });
      }else{
        form.controls['email'].setErrors({ [errorKey]: true });
      }
    } else {
      this.toast.error('Internal server error');
    }
  }
}