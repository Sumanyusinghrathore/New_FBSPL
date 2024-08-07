import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { HubspotService } from '../../../services/hubspot/hubspot.service';
import {
  customEmailValidator,
  exactLengthValidator,
  requiredButNotAllowBlank,
} from '../../../utils/Validator';
import { NoNumbersDirective } from '../../../directives/noNumbers.directive';
import { OnlyNumbersDirective } from '../../../directives/onlyNumbers.directive';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    NoNumbersDirective,
    OnlyNumbersDirective,
  ],
})
export class ConnectComponent implements OnInit {
  LetsConnectForm!: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private hubspotService: HubspotService
  ) {}

  ngOnInit(): void {
    this.LetsConnectForm = this.formBuilder.group({
      firstname: ['', requiredButNotAllowBlank()],
      email: ['', [requiredButNotAllowBlank(), customEmailValidator]],
      phone: ['', [requiredButNotAllowBlank(), exactLengthValidator(10)]],
      company: ['', requiredButNotAllowBlank()],
      write_us: ['', requiredButNotAllowBlank()],
    });
  }

  get LetsConnectFormf() {
    return this.LetsConnectForm.controls;
  }

  validateForm(form: FormGroup): void {
    this.submitted = true;
    if (form.invalid) {
      return;
    }
    const formData = form.value;
    const formId = '9752f77d-ad36-4a60-ac4d-e531fdf855a7';
    this.hubspotService.submitForm(formId, formData).subscribe(
      (response) => {
        console.log('Form submitted successfully:', response);
        this.router.navigate(['/thankyou']);
      },
      (error) => {
        console.error('Error submitting form:', error);
        alert('Error submitting form. Please try again.');
      }
    );
  }
}
