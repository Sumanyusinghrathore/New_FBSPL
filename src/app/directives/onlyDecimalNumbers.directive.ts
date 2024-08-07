import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDecimalNumbers]',
  standalone: true,
})
export class OnlyDecimalNumbersDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Remove non-numeric and non-decimal point characters
    value = value.replace(/[^0-9.]/g, '');

    // Ensure only one decimal point and limit to 5 characters total
    const parts = value.split('.');
    if (parts.length > 2) {
      // More than one decimal point found, keep only the first part
      value = parts[0] + '.' + parts[1];
    }

    if (value.length > 5) {
      // Limit total length to 5 characters, including the decimal point
      value = value.slice(0, 5);
    }

    // Update the form control value
    this.ngControl.control?.setValue(value);
  }
}
