import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNoNumbers]',
  standalone: true,
})
export class NoNumbersDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Remove non-alphabet characters and non-full stop characters, allow space
    value = value.replace(/[^a-zA-Z. ]/g, '');

    // Replace multiple spaces with a single space
    value = value.replace(/\s+/g, ' ');

    // Limit to a maximum of 30 characters
    value = value.slice(0, 30);

    // Update the form control value
    this.ngControl.control?.setValue(value);
  }
}
