import { Component, Input, Output, EventEmitter } from '@angular/core';
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

  @Input() iconName: string = '';

  @Input() iconVisibility: boolean = false;

  @Output() iconVisibilityChange = new EventEmitter<boolean>();

  isInvalidField(field: string): boolean | null {
    return this.customValidator.isInvalidField(this.formGroup, field);
  }

  errorsField(field: string): string | null {
    return this.customValidator.getFieldErrorByForm(this.formGroup, field) ?? this.authValidator.getFieldErrorByAPI(this.formGroup, field);
  }

  onClickIcon() {
    this.iconVisibility = !this.iconVisibility;
    this.iconVisibilityChange.emit(this.iconVisibility);
  }
}