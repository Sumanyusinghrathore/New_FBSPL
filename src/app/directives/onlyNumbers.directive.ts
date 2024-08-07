import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appOnlyNumbers]',
  standalone: true,
})
export class OnlyNumbersDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Keep only numeric characters in the input value
    const newValue = value.replace(/[^0-9]/g, '');

    // Update the form control value
    this.ngControl.control?.setValue(newValue);
  }
}
