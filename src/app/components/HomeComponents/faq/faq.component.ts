import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HubspotService } from '../../../services/hubspot/hubspot.service';
import {
  requiredButNotAllowBlank,
  customEmailValidator,
} from '../../../utils/Validator';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Added CommonModule
})
export class FaqComponent implements OnInit {
  FaqForm!: FormGroup;
  currentRoute!: string;
  submitted = false;
  successfull = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private hubspotService: HubspotService
  ) {}

  ngOnInit(): void {
    this.getCurrentRoute();

    // Subscribe to router events to update the current route on navigation
    this.router.events.subscribe(() => {
      this.getCurrentRoute();
    });

    this.FaqForm = this.formBuilder.group({
      email: ['', [requiredButNotAllowBlank(), customEmailValidator]],
      write_your_message: ['', requiredButNotAllowBlank()],
      url: [this.currentRoute],
    });
  }

  get FaqFormf() {
    return this.FaqForm.controls;
  }
  validateForm() {
    this.submitted = true;
    if (this.FaqForm.invalid) {
      return;
    }
    const formId = 'a430154e-4a38-4a35-a5f7-59e72a4b2a59';
    const formData = this.FaqForm.value;
    this.hubspotService.submitForm(formId, formData).subscribe(
      (response) => {
        console.log('Form submitted successfully:', response);
        this.successfull = true;
      },
      (error) => {
        console.error('Error submitting form:', error);
        alert('Error submitting form. Please try again.');
      }
    );
  }
  private getCurrentRoute(): void {
    const urlSegments: UrlSegment[] = this.activatedRoute.snapshot.url;
    this.currentRoute = urlSegments.map((segment) => segment.path).join('/');
  }
}
