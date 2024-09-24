import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidatorsService } from '../../service/validators.service';
import { ValidatorsAuthService } from '../../../auth/services/validatorsAuth.service';

@Component({
  selector: 'shared-form-field',
  templateUrl: './form-field.component.html'
})
export class FormFieldComponent {

  constructor(
    private customValidator: ValidatorsService,
    private authValidator: ValidatorsAuthService
  ) { }

  @Input() fieldName!: string;

  @Input() label!: string;

  @Input() type: string = 'text';

  @Input() placeholder!: string;

  @Input() formGroup!: FormGroup;

  isInvalidField(field: string): boolean | null {
    return this.customValidator.isInvalidField(this.formGroup, field);
  }

  errorsField(field: string): string | null {
    return this.authValidator.getFieldError(this.formGroup, field);
  }
}
