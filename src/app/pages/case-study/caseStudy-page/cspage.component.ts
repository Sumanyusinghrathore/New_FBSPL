import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NoNumbersDirective } from '../../../directives/noNumbers.directive';
import { OnlyNumbersDirective } from '../../../directives/onlyNumbers.directive';
import { HubspotService } from '../../../services/hubspot/hubspot.service';
import { SeoData } from '../../../services/seo/seo-data.model';
import { SeoService } from '../../../services/seo/seo.service';
import {
  customEmailValidator,
  requiredButNotAllowBlank,
} from '../../../utils/Validator';
import { CdnUrlDirective } from '../../../directives/cdn-url.directive';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-cspage',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NoNumbersDirective,
    OnlyNumbersDirective,
    CdnUrlDirective,
  ],
  templateUrl: './cspage.component.html',
  styleUrl: './cspage.component.css',
})
export class CaseStudyPageComponent implements OnInit {
  private apiUrl = environment.apiUrl;
  @ViewChild('closeButton') closeButton!: ElementRef;
  slug: string | null = null;
  caseStudyDetail: any;
  caseStudyDownloadForm!: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private seoService: SeoService,
    private hubspotService: HubspotService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}
  hasApiData(): boolean {
    return this.caseStudyDetail && Object.keys(this.caseStudyDetail).length > 0;
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.slug = params.get('slug') || '';
      if (this.slug) {
        this.loadCaseStudy();
      } else {
        console.error('Slug is null');
      }
    });
  }

  intialiseForm(): void {
    this.caseStudyDownloadForm = this.formBuilder.group({
      firstname: ['', requiredButNotAllowBlank()],
      email: ['', [requiredButNotAllowBlank(), customEmailValidator]],
      url: [this.caseStudyDetail.slug],
    });
  }
  get caseStudyDownloadFormf() {
    return this.caseStudyDownloadForm.controls;
  }

  setSeo(): void {
    const seoData: SeoData = {
      title: this.caseStudyDetail?.title,
      description: this.caseStudyDetail?.meta_description,
      keywords: this.caseStudyDetail?.keywords,
      ogImage: this.caseStudyDetail?.caseStudy_desktop_banner,
      author: this.caseStudyDetail?.written_by,
    };
    this.seoService.setMetaTags(seoData);
  }

  loadCaseStudy() {
    const apicaseUrl = `${this.apiUrl}/api/case/study/details/${this.slug}`;
    this.http.get(apicaseUrl).subscribe(
      (data: any) => {
        if (data && data.data) {
          this.caseStudyDetail = data.data;
          this.setSeo();
          this.intialiseForm();
        } else {
          console.warn('No data found in the response.');
        }
      },
      (error) => {
        this.router.navigate(['/case-studies']);
        console.error('Error fetching detail:', error);
      }
    );
  }

  validateForm(form: FormGroup): void {
    if (isPlatformBrowser(this.platformId)) {
      this.submitted = true;
      if (form.invalid) {
        return;
      }
      const formData = form.value;
      const formId = '2311e78b-d5da-49d0-98e1-a9d72c07e34c';
      this.hubspotService.submitForm(formId, formData).subscribe(
        (response) => {
          this.closeButton.nativeElement.click();
          console.log('Form submitted successfully:', response);
          window.open(this.caseStudyDetail.case_Study_pdf, '_blank');
        },
        (error) => {
          console.error('Error submitting form:', error);
          alert('Error submitting form. Please try again.');
        }
      );
    }
    return undefined;
  }
}
