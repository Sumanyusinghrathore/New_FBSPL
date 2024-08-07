import { Component, OnInit, Renderer2, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SeoService } from '../../../../src/app/services/seo/seo.service';
import { SeoData } from '../../../../src/app/services/seo/seo-data.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import {
  customEmailValidator,
  fileExtensionValidator,
} from '../../../../src/app/utils/Validator';
import { HubspotService } from '../../../../src/app/services/hubspot/hubspot.service';
import { FormApiService } from '../../../../src/app/services/formApi/formApi.service';
import { HttpClient } from '@angular/common/http';
import { Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { NoNumbersDirective } from '../../../../src/app/directives/noNumbers.directive';
import { OnlyNumbersDirective } from '../../../../src/app/directives/onlyNumbers.directive';
import { MediaUploadService } from '../../../../src/app/services/mediaUpload/mediaUpload.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CdnUrlDirective } from '../../../../src/app/directives/cdn-url.directive';
import { environment } from '../../../../src/environments/environment';

type SlideType =
  | 'Services'
  | 'Careers'
  | 'Alliances & Partnerships'
  | 'Website Feedback'
  | 'Media & General Query';

interface Content {
  image: string;
  parra: string;
}

@Component({
  selector: 'app-contactUs',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    NoNumbersDirective,
    OnlyNumbersDirective,
    CdnUrlDirective,
  ],
  templateUrl: './contactUs.component.html',
  styleUrl: './contactUs.component.css',
})
export class ContactUsComponent implements OnInit {
  cdnUrl = environment.cdnUrl;
  outSourcingService!: FormGroup;
  career!: FormGroup;
  AlliancesPartnerships!: FormGroup;
  WebsiteFeedback!: FormGroup;
  MediaGeneralQuery!: FormGroup;
  submitted = false;
  ResumefileName: string | null = null;
  ResumefilePath: string = '';
  safeResumeUrl!: SafeUrl;
  allowedResumeExtensions = ['pdf', 'doc', 'docx'];

  constructor(
    private seoService: SeoService,
    private formBuilder: FormBuilder,
    private hubspotService: HubspotService,
    private formApiService: FormApiService,
    private router: Router,
    private http: HttpClient,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object,
    private uploadService: MediaUploadService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'Contact FBSPL | Get in Touch with Us',
      description:
        'Reach out to FBSPL for inquiries or support. Our team is here to assist with your business process outsourcing (BPO) and management needs. Contact us today to learn more!',
      keywords: 'contact, get in touch',
      ogImage: '/contact-us/ContactUs.jpg',
    };

    this.seoService.setMetaTags(seoData);
    this.outSourcingService = this.formBuilder.group({
      firstname: ['', requiredButNotAllowBlank()],
      email: ['', [requiredButNotAllowBlank(), customEmailValidator]],
      phone: ['', [requiredButNotAllowBlank(), exactLengthValidator(10)]],
      where_did_you_find_us: ['', requiredButNotAllowBlank()],
      write_message_to_us: ['', requiredButNotAllowBlank()],
    });
    this.career = this.formBuilder.group({
      name: ['', requiredButNotAllowBlank()],
      email: ['', [requiredButNotAllowBlank(), customEmailValidator]],
      phone: ['', [requiredButNotAllowBlank(), exactLengthValidator(10)]],
      whereUDoFindUs: ['', requiredButNotAllowBlank()],
      whereDidYouGotToKnow: ['', requiredButNotAllowBlank()],
      resumeupload: [
        '',requiredButNotAllowBlank()
        // [
        //   Validators.required,requiredButNotAllowBlank(),
        //   fileExtensionValidator(this.allowedResumeExtensions),
        // ],
      ],
    });
    this.AlliancesPartnerships = this.formBuilder.group({
      name: ['', requiredButNotAllowBlank()],
      email: ['', [requiredButNotAllowBlank(), customEmailValidator]],
      position: ['', requiredButNotAllowBlank()],
      companyName: ['', requiredButNotAllowBlank()],
      country: ['', Validators.required],
      industry: ['', requiredButNotAllowBlank()],
      partnership: ['', requiredButNotAllowBlank()],
      partnerProgram: ['', requiredButNotAllowBlank()],
      motivationToPartner: ['', requiredButNotAllowBlank()],
    });
    this.MediaGeneralQuery = this.formBuilder.group({
      name: ['', requiredButNotAllowBlank()],
      email: ['', [requiredButNotAllowBlank(), customEmailValidator]],
      phone: ['', [requiredButNotAllowBlank(), exactLengthValidator(10)]],
      whereUFindUs: ['', requiredButNotAllowBlank()],
      message: ['', requiredButNotAllowBlank()],
    });

    this.WebsiteFeedback = this.formBuilder.group({
      name: ['', requiredButNotAllowBlank()],
      email: ['', [requiredButNotAllowBlank(), customEmailValidator]],
      isFirstVisit: ['', Validators.required],
      FindYourNeed: ['', Validators.required],
      feedback: ['', requiredButNotAllowBlank()],
    });

    if (isPlatformBrowser(this.platformId)) {
      this.http
        .get(`${this.cdnUrl}assets/contact-us/mapNew.svg`, {
          responseType: 'text',
        })
        .subscribe((svg) => {
          const svgContainer = this.renderer.createElement('div');
          svgContainer.innerHTML = svg;

          // Append the svgContainer to the desired parent element
          document.getElementById('svg-container')!.appendChild(svgContainer);

          // Access the SVG element and set its width and height to 100%
          const svgElement = svgContainer.querySelector('svg');
          if (svgElement) {
            svgElement.style.width = '100%';
            svgElement.style.height = '100%';
          }

          this.addInteractivity();
        });
    }
  }

  onResumeFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (fileExtension === 'jpg' || fileExtension === 'png') {
        this.career.controls['resume'].setErrors({ invalidExtension: true });
      } else {
        this.ResumefileName = this.trimFileName(file.name);
        this.uploadService.uploadFile(file).subscribe(
          (response) => {
            this.ResumefilePath = response.media;
            this.safeResumeUrl = this.sanitizer.bypassSecurityTrustUrl(
              this.ResumefilePath
            );
            const urlString =
              this.sanitizer.sanitize(SecurityContext.URL, this.safeResumeUrl) ||
              '';
            this.career.patchValue({
              resume: urlString,
            });
            console.log('Upload successful:', response);
          },
          (error) => {
            console.error('Upload failed:', error);
          }
        );
      }
    }
  }

  trimFileName(fileName: string): string {
    const parts = fileName.split('.');
    const extension = parts.pop();
    const namePart = parts.join('.');

    // Split the name part into words
    const words = namePart.split('');

    // Trim the words array to the first 10 words
    const trimmedWords = words.slice(0, 10);

    // Join the trimmed words and add the extension back
    const trimmedFileName = trimmedWords.join('') + '...' + extension;
    return trimmedFileName;
  }

  addInteractivity() {
    const pointer1 = document.getElementById('pointer1');
    const box1 = document.getElementById('box1');
    const arrow1 = document.getElementById('arrow1');
    const head1 = document.getElementById('head1');
    const para1 = document.getElementById('para1');
    const pointer2 = document.getElementById('pointer2');
    const box2 = document.getElementById('box2');
    const arrow2 = document.getElementById('arrow2');
    const box21 = document.getElementById('box21');
    const arrow21 = document.getElementById('arrow21');
    const head2 = document.getElementById('head2');
    const para2 = document.getElementById('para2');
    const pointer3 = document.getElementById('pointer3');
    const box3 = document.getElementById('box3');
    const arrow3 = document.getElementById('arrow3');
    const head3 = document.getElementById('head3');
    const para3 = document.getElementById('para3');
    const pointer4 = document.getElementById('pointer4');
    const box4 = document.getElementById('box4');
    const arrow4 = document.getElementById('arrow4');
    const head4 = document.getElementById('head4');
    const para4 = document.getElementById('para4');
    const point1 = document.getElementById('point1');
    const point2 = document.getElementById('point2');
    const point3 = document.getElementById('point3');
    const point4 = document.getElementById('point4');
    const poi1 = document.getElementById('poi1');
    const poi2 = document.getElementById('poi2');
    const poi3 = document.getElementById('poi3');
    const poi4 = document.getElementById('poi4');
    if (
      pointer1 !== null &&
      point1 !== null &&
      box1 !== null &&
      arrow1 !== null &&
      para1 !== null &&
      head1 !== null &&
      poi1 !== null
    ) {
      pointer1.addEventListener('mouseover', (e) => {
        box1.style.display = 'block';
        arrow1.style.display = 'block';
        para1.style.display = 'block';
        head1.style.display = 'block';
      });
      point1.addEventListener('mouseover', (e) => {
        box1.style.display = 'block';
        arrow1.style.display = 'block';
        para1.style.display = 'block';
        head1.style.display = 'block';
      });
      box1.addEventListener('mouseover', (e) => {
        box1.style.display = 'none';
        arrow1.style.display = 'none';
        para1.style.display = 'none';
        head1.style.display = 'none';
      });
      arrow1.addEventListener('mouseover', (e) => {
        box1.style.display = 'none';
        arrow1.style.display = 'none';
        para1.style.display = 'none';
        head1.style.display = 'none';
      });
      para1.addEventListener('mouseover', (e) => {
        box1.style.display = 'none';
        arrow1.style.display = 'none';
        para1.style.display = 'none';
        head1.style.display = 'none';
      });
      head1.addEventListener('mouseover', (e) => {
        box1.style.display = 'none';
        arrow1.style.display = 'none';
        para1.style.display = 'none';
        head1.style.display = 'none';
      });
      poi1.addEventListener('mouseout', (e) => {
        box1.style.display = 'none';
        arrow1.style.display = 'none';
        para1.style.display = 'none';
        head1.style.display = 'none';
      });
    }

    if (
      pointer1 !== null &&
      box1 !== null &&
      arrow1 !== null &&
      para1 !== null &&
      head1 !== null
    ) {
      pointer1.addEventListener('mouseout', (e) => {
        box1.style.display = 'none';
        arrow1.style.display = 'none';
        para1.style.display = 'none';
        head1.style.display = 'none';
      });
    }

    // for the first pointer

    if (
      pointer2 !== null &&
      point2 !== null &&
      box2 !== null &&
      arrow2 !== null &&
      para2 !== null &&
      head2 !== null &&
      poi2 !== null
    ) {
      pointer2.addEventListener('mouseover', (e) => {
        box2.style.display = 'block';
        arrow2.style.display = 'block';
        para2.style.display = 'block';
        head2.style.display = 'block';
      });
      point2.addEventListener('mouseover', (e) => {
        box2.style.display = 'block';
        arrow2.style.display = 'block';
        para2.style.display = 'block';
        head2.style.display = 'block';
      });
      box2.addEventListener('mouseover', (e) => {
        box2.style.display = 'none';
        arrow2.style.display = 'none';
        para2.style.display = 'none';
        head2.style.display = 'none';
      });
      arrow2.addEventListener('mouseover', (e) => {
        box2.style.display = 'none';
        arrow2.style.display = 'none';
        para2.style.display = 'none';
        head2.style.display = 'none';
      });
      para2.addEventListener('mouseover', (e) => {
        box2.style.display = 'none';
        arrow2.style.display = 'none';
        para2.style.display = 'none';
        head2.style.display = 'none';
      });
      head2.addEventListener('mouseover', (e) => {
        box2.style.display = 'none';
        arrow2.style.display = 'none';
        para2.style.display = 'none';
        head2.style.display = 'none';
      });
      poi2.addEventListener('mouseout', (e) => {
        box2.style.display = 'none';
        arrow2.style.display = 'none';
        para2.style.display = 'none';
        head2.style.display = 'none';
      });
    }

    if (
      pointer2 !== null &&
      box2 !== null &&
      arrow2 !== null &&
      box21 !== null &&
      arrow21 !== null &&
      para2 !== null &&
      head2 !== null
    ) {
      pointer2.addEventListener('mouseout', (e) => {
        box2.style.display = 'none';
        arrow2.style.display = 'none';
        para2.style.display = 'none';
        head2.style.display = 'none';
        box21.style.display = 'none';
        arrow21.style.display = 'none';
      });
    }

    // for the second pointer

    if (
      pointer3 !== null &&
      point3 !== null &&
      poi3 !== null &&
      box3 !== null &&
      arrow3 !== null &&
      para3 !== null &&
      head3 !== null
    ) {
      pointer3.addEventListener('mouseover', (e) => {
        box3.style.display = 'block';
        arrow3.style.display = 'block';
        para3.style.display = 'block';
        head3.style.display = 'block';
      });
      point3.addEventListener('mouseover', (e) => {
        box3.style.display = 'block';
        arrow3.style.display = 'block';
        para3.style.display = 'block';
        head3.style.display = 'block';
      });
      box3.addEventListener('mouseover', (e) => {
        box3.style.display = 'none';
        arrow3.style.display = 'none';
        para3.style.display = 'none';
        head3.style.display = 'none';
      });
      arrow3.addEventListener('mouseover', (e) => {
        box3.style.display = 'none';
        arrow3.style.display = 'none';
        para3.style.display = 'none';
        head3.style.display = 'none';
      });
      para3.addEventListener('mouseover', (e) => {
        box3.style.display = 'none';
        arrow3.style.display = 'none';
        para3.style.display = 'none';
        head3.style.display = 'none';
      });
      head3.addEventListener('mouseover', (e) => {
        box3.style.display = 'none';
        arrow3.style.display = 'none';
        para3.style.display = 'none';
        head3.style.display = 'none';
      });
      poi3.addEventListener('mouseout', (e) => {
        box3.style.display = 'none';
        arrow3.style.display = 'none';
        para3.style.display = 'none';
        head3.style.display = 'none';
      });
    }

    if (
      pointer3 !== null &&
      box3 !== null &&
      arrow3 !== null &&
      para3 !== null &&
      head3 !== null
    ) {
      pointer3.addEventListener('mouseout', (e) => {
        box3.style.display = 'none';
        arrow3.style.display = 'none';
        para3.style.display = 'none';
        head3.style.display = 'none';
      });
    }

    // for the third pointer

    if (
      pointer4 !== null &&
      point4 !== null &&
      poi4 !== null &&
      box4 !== null &&
      arrow4 !== null &&
      para4 !== null &&
      head4 !== null
    ) {
      pointer4.addEventListener('mouseover', (e) => {
        box4.style.display = 'block';
        arrow4.style.display = 'block';
        para4.style.display = 'block';
        head4.style.display = 'block';
      });
      point4.addEventListener('mouseover', (e) => {
        box4.style.display = 'block';
        arrow4.style.display = 'block';
        para4.style.display = 'block';
        head4.style.display = 'block';
      });
      box4.addEventListener('mouseover', (e) => {
        box4.style.display = 'none';
        arrow4.style.display = 'none';
        para4.style.display = 'none';
        head4.style.display = 'none';
      });
      arrow4.addEventListener('mouseover', (e) => {
        box4.style.display = 'none';
        arrow4.style.display = 'none';
        para4.style.display = 'none';
        head4.style.display = 'none';
      });
      para4.addEventListener('mouseover', (e) => {
        box4.style.display = 'none';
        arrow4.style.display = 'none';
        para4.style.display = 'none';
        head4.style.display = 'none';
      });
      head4.addEventListener('mouseover', (e) => {
        box4.style.display = 'none';
        arrow4.style.display = 'none';
        para4.style.display = 'none';
        head4.style.display = 'none';
      });
      poi4.addEventListener('mouseout', (e) => {
        box4.style.display = 'none';
        arrow4.style.display = 'none';
        para4.style.display = 'none';
        head4.style.display = 'none';
      });
    }

    if (
      pointer4 !== null &&
      box4 !== null &&
      arrow4 !== null &&
      para4 !== null &&
      head4 !== null
    ) {
      pointer4.addEventListener('mouseout', (e) => {
        box4.style.display = 'none';
        arrow4.style.display = 'none';
        para4.style.display = 'none';
        head4.style.display = 'none';
      });
    }
  }



  get outSourcingServicef() {
    return this.outSourcingService.controls;
  }
  get careerf() {
    return this.career.controls;
  }
  get AlliancesPartnershipsf() {
    return this.AlliancesPartnerships.controls;
  }
  get WebsiteFeedbackf() {
    return this.WebsiteFeedback.controls;
  }
  get MediaGeneralQueryf() {
    return this.MediaGeneralQuery.controls;
  }

  activeSlide: SlideType = 'Services';

  updateContent(slide: SlideType) {
    this.submitted = false;
    this.activeSlide = slide;
  }

  validateForm(form: FormGroup): void {
    this.submitted = true;
    if (form.invalid) {
      return;
    }
    const formData = form.value;
    if (form === this.outSourcingService) {
      const formId = '2f5a8da1-3c4a-4747-891f-b28919b43450';
      this.hubspotService.submitForm(formId, formData).subscribe(
        (response) => {
          console.log('Form submitted successfully:', response);
          this.router.navigate(['/services/thankyou']);
        },
        (error) => {
          console.error('Error submitting form:', error);
          alert('Error submitting form. Please try again.');
        }
      );
    } else if (form === this.career) {
      this.formApiService.submitCareerForm(formData).subscribe(
        (response) => {
          console.log('Form submitted successfully:', response);
          this.router.navigate(['/careers/thankyou']);
        },
        (error) => {
          console.error('Error submitting form:', error);
          alert('Error submitting form. Please try again.');
        }
      );
    } else if (form === this.AlliancesPartnerships) {
      this.formApiService.submitAlliancesPartnershipsForm(formData).subscribe(
        (response) => {
          console.log('Form submitted successfully:', response);
          this.router.navigate([
            '/alliances-and-partnership-with-fbspl/thankyou',
          ]);
        },
        (error) => {
          console.error('Error submitting form:', error);
          alert('Error submitting form. Please try again.');
        }
      );
    } else if (form === this.MediaGeneralQuery) {
      this.formApiService.submitMediaGeneralQueryForm(formData).subscribe(
        (response) => {
          console.log('Form submitted successfully:', response);
          this.router.navigate(['/media-and-general-query/thankyou']);
        },
        (error) => {
          console.error('Error submitting form:', error);
          alert('Error submitting form. Please try again.');
        }
      );
    } else if (form === this.WebsiteFeedback) {
      this.formApiService.submitWebsiteFeedbackForm(formData).subscribe(
        (response) => {
          console.log('Form submitted successfully:', response);
          this.router.navigate(['/website-feedback/thankyou']);
        },
        (error) => {
          console.error('Error submitting form:', error);
          alert('Error submitting form. Please try again.');
        }
      );
    }
  }
}

function requiredButNotAllowBlank(): ValidatorFn {
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
function exactLengthValidator(requiredLength: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value.replace(/\D/g, ''); // Remove non-digit characters
    return value.length === requiredLength
      ? null
      : { exactLength: { requiredLength, actualLength: value.length } };
  };
}
