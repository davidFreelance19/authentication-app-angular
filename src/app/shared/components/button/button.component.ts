import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-button',
  templateUrl: './button.component.html',
})
export class SharedButtonComponent {
  @Input() text!: string;
  @Input() typeButton: string = "submit";
  @Input() isLoading: boolean = false;
}