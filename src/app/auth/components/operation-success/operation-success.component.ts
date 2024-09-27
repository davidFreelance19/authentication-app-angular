import { Component, Input } from '@angular/core';

@Component({
  selector: 'auth-operation-success',
  templateUrl: './operation-success.component.html',
})
export class OperationSuccessComponent {

  @Input() description!: string;

  @Input() linkText!: string;

  @Input() link!: string;
}
