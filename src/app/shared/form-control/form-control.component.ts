import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css'],
})
export class FormControlComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() id: string = '';
  @Input() inputClass: string = 'form-control';
  @Input() controlName: string = '';
  @Input() formControl: AbstractControl;

  get hasError(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

  get errorMessage(): string {
    if (this.hasError && this.formControl.errors['required']) {
      return `The ${this.label.toLowerCase()} field is required.`;
    }
    return '';
  }
}
