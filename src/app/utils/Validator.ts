import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormControl,
} from '@angular/forms';
export function fileExtensionValidator(
  allowedExtensions: string[]
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const file: File = control.value;
    if (file) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (!allowedExtensions.includes(fileExtension!)) {
        return { invalidExtension: true };
      }
    }
    return null;
  };
}

export function requiredButNotAllowBlank(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (
      value === null ||
      value === undefined ||
      (typeof value === 'string' && value.trim() === '') ||
      value.length < 3
    ) {
      return { requiredButNotAllowBlank: true }; // Custom error key
    }
    return null;
  };
}
export function exactLengthValidator(requiredLength: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value.replace(/\D/g, ''); // Remove non-digit characters
    return value.length === requiredLength
      ? null
      : { exactLength: { requiredLength, actualLength: value.length } };
  };
}
export function customEmailValidator(
  control: FormControl
): { [key: string]: any } | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (control.value && control.value.length >= 3) {
    const valid = emailRegex.test(control.value);
    return valid ? null : { email: { value: control.value } };
  }
  return null;
}
