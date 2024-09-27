import { Injectable } from '@angular/core';

import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {

  public namePattern: string = "^(?=.*^[A-Z].*$)(?=.*^[a-zA-ZÀ-ÿ]+$)(?=.*^\\S+$).*$";
  public lastnamePattern: string = "^(?=.*^[A-Z].*$)(?=.*^[a-zA-ZÀ-ÿ]+$)(?=.*^\\S+$).*$";
  public passwordPattern: string = "^(?=.*[A-Z])(?=.*\\d).+$";

  public isInvalidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public getFieldErrorByForm(form: FormGroup, field: string): string | null {
    const control = form.controls[field];
    if (!control) return null;

    switch (true) {
      case control.hasError('required'):
        return `${field} is required`;
      case control.hasError('pattern'):
        return `${field} is not valid`;
      case control.hasError('minlength'):
        return `should be at least ${control.errors?.['minlength'].requiredLength} characters`;
      case control.hasError('maxlength'):
        return `should be at most ${control.errors?.['maxlength'].requiredLength} characters`;
      case control.hasError('passwordMismatch'):
        return 'Passwords do not match';
      default:
        return null;
    }
  }

  public passwordMatchValidator(password: string, confirmPassword: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordControl = control.get(password);
      const confirmPasswordControl = control.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      const isMatch = passwordControl.value === confirmPasswordControl.value;
      if (!isMatch) {
        passwordControl.setErrors({ passwordMismatch: true });
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        passwordControl.setErrors(null);
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }
}
