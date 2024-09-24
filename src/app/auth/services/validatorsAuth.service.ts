import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { toast } from 'ngx-sonner';

@Injectable({ providedIn: 'root' })
export class ValidatorsAuthService {
  protected readonly toast = toast;

  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  getFieldError(form: FormGroup, field: string): string | null {

    if (!form.controls[field]) return null;

    const errors = form.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Can’t be empty';
        case 'pattern':
          return "Email not valid";
        case 'minlength':
          return `Must be  least ${errors['minlength'].requiredLength} caracters.`;
        case 'notEqual':
          return 'Passwords do not match'
        case 'emailTaken':
          return 'User already exists';
        case 'passwordIncorrect':
          return 'Please check again'
        case 'userNotExist':
          return 'User not exists';
        case 'notVerfied':
          return 'User not verified';
        case 'alreadyVerified':
          return 'User already verified';
        case 'alreadyCode':
          return 'You already have code, check your email'
        case 'codeIncorrect':
          return 'Code incorrect'
      }
    }
    return null;
  }

  handleFormError(form: FormGroup, error: string) {
    switch (error) {
      case 'User not exists':
        form.controls['email'].setErrors({ 'userNotExist': true });
        break;
      case 'User already exists':
        form.controls['email'].setErrors({ 'emailTaken': true });
        break;
      case 'User already verified':
        form.controls['email'].setErrors({ 'alreadyVerified': true });
        break;
      case 'User not verified':
        form.controls['email'].setErrors({ 'notVerfied': true });
        break;
      case 'Password incorrect':
        form.controls['password'].setErrors({ 'passwordIncorrect': true });
        break;
      case 'Code incorrect':
        form.controls['email'].setErrors({ 'codeIncorrect': true });
        break;
      case 'You already have code, check your email':
        form.controls['email'].setErrors({ 'alreadyCode': true });
        break;
      default:
        toast.error('Internal server error')
        break;
    }
  }
}
