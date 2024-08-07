import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { SeoService } from '../../services/seo/seo.service';
import { SeoData } from '../../services/seo/seo-data.model';
import { NoNumbersDirective } from '../../directives/noNumbers.directive';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { HubspotService } from '../../services/hubspot/hubspot.service';
import {
  requiredButNotAllowBlank,
  customEmailValidator,
} from '../../utils/Validator';
import { CdnUrlDirective } from '../../directives/cdn-url.directive';
@Component({
  selector: 'app-bookAConsultation',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    NoNumbersDirective,
    CdnUrlDirective,
  ],
  templateUrl: './bookAConsultation.component.html',
  styleUrl: './bookAConsultation.component.css',
})
export class BookAConsultationComponent implements OnInit {
  consultationForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private seoService: SeoService,
    private router: Router,
    private hubspotService: HubspotService
  ) {}
  ngOnInit(): void {
    this.consultationForm = this.formBuilder.group({
      firstname: ['', requiredButNotAllowBlank()],
      email: ['', [requiredButNotAllowBlank(), customEmailValidator]],
      company: ['', requiredButNotAllowBlank()],
      services: ['', requiredButNotAllowBlank()],
      write_your_message: ['', requiredButNotAllowBlank()],
    });
    const seoData: SeoData = {
      title: 'Book Consultation | Schedule Your Appointment Today - FBSPL',
      description:
        'Schedule your free consultation to learn how FBSPL can elevate your business with expert process management consultation and BPO services.',
      keywords: 'book consultation',
      ogImage: '/BookAConsultation/BookConsultation.jpg',
    };

    this.seoService.setMetaTags(seoData);
  }
  get consultationFormf() {
    return this.consultationForm.controls;
  }

  validateForm(form: FormGroup): void {
    this.submitted = true;
    if (this.consultationForm.invalid) {
      return;
    }
    const formId = '54cdb521-e6b8-423b-b30b-33438b3ad5ae';
    const formData = this.consultationForm.value;
    this.hubspotService.submitForm(formId, formData).subscribe(
      (response) => {
        console.log('Form submitted successfully:', response);
        this.router.navigate(['/book-free-consultation-call/thankyou']);
      },
      (error) => {
        console.error('Error submitting form:', error);
        alert('Error submitting form. Please try again.');
      }
    );
  }
}
