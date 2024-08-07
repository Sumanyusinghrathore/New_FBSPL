import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  Inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import {
  SlickCarouselComponent,
  SlickCarouselModule,
} from 'ngx-slick-carousel';
import { SeoService } from '../../../services/seo/seo.service';
import { SeoData } from '../../../services/seo/seo-data.model';
import { SubBlogService } from '../../../services/subBlog/subBlog.service';
import { NoNumbersDirective } from '../../../directives/noNumbers.directive';
import { OnlyNumbersDirective } from '../../../directives/onlyNumbers.directive';
import { PLATFORM_ID } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { FormApiService } from '../../../services/formApi/formApi.service';
import { HubspotService } from '../../../services/hubspot/hubspot.service';
import {
  requiredButNotAllowBlank,
  customEmailValidator,
} from '../../../utils/Validator';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CdnUrlDirective } from '../../../directives/cdn-url.directive';

@Component({
  selector: 'blog-service-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SlickCarouselModule,
    RouterLink,
    NoNumbersDirective,
    OnlyNumbersDirective,
    CdnUrlDirective,
  ],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.css',
})
export class BlogPageComponent implements OnInit {
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  @ViewChild('htmlContent', { static: true }) htmlContent:
    | ElementRef
    | undefined;
  CommentForm!: FormGroup;
  SubscribeForm!: FormGroup;
  slug!: string;
  featuredBlogs: any = [];
  relatedBlogs: any = [];
  recentBlogs: any = [];
  BlogData: any = {};
  ApiData: any = {};
  headings: string[] = [];
  submitted = false;
  commentSubmission = false;
  SubscribeFormsubmitted = false;
  subscribeSuccess = false;
  processedHtml: SafeHtml | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private SubBlogService: SubBlogService,
    private seoService: SeoService,
    private formApiService: FormApiService,
    private router: Router,
    private hubspotService: HubspotService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  hasApiData(): boolean {
    return this.ApiData && Object.keys(this.ApiData).length > 0;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.slug = params.get('slug') || '';
      if (this.slug) {
        this.loadBlogPost(this.slug);
      } else {
        console.error('Slug is null');
      }
    });
    this.handleBodyClass();
  }

  private handleBodyClass() {
    let body = document.getElementById('body');
    let url = '';
    if (body !== null) {
      if (url === `/blogs`) {
        body.style.overflow = 'hidden';
        debugger;
      } else {
        body.style.overflow = 'visible';
      }
    }
  }

  get CommentFormf() {
    return this.CommentForm.controls;
  }
  get SubscribeFormf() {
    return this.SubscribeForm.controls;
  }
  intialiseForm(): void {
    this.CommentForm = this.formBuilder.group({
      blog_id: this.BlogData.id,
      name: ['', requiredButNotAllowBlank()],
      email: ['', [requiredButNotAllowBlank(), customEmailValidator]],
      mobile: ['', [requiredButNotAllowBlank(), this.exactLengthValidator(10)]],
      comments: ['', requiredButNotAllowBlank()],
    });
    this.SubscribeForm = this.formBuilder.group({
      email: ['', [requiredButNotAllowBlank(), customEmailValidator]],
    });
  }
  setSeo(): void {
    const seoData: SeoData = {
      title: this.BlogData?.meta_title,
      description: this.BlogData?.meta_description,
      keywords: this.BlogData?.keywords,
      ogImage: this.BlogData?.feature_image,
      author: this.BlogData?.written_by,
    };
    this.seoService.setMetaTags(seoData);
  }

  loadBlogPost(slug: string): void {
    this.SubBlogService.getSubBlogData(slug).subscribe(
      (data) => {
        this.ApiData = data.data;
        this.BlogData = this.ApiData.blog;
        this.featuredBlogs = this.ApiData.featured_blogs;
        this.relatedBlogs = this.ApiData.related_blogs;
        this.recentBlogs = this.ApiData.recent_blogs;
        this.setSeo();
        this.intialiseForm();
        this.processHtml();
        this.reinitializeCarousel();
      },
      (error) => {
        if (error.error.status === 0) {
          this.router.navigate(['/blogs']);
        }
        console.error('Error fetching blog data', error);
      }
    );
  }

  processHtml(): void {
    const tempDiv = this.renderer.createElement('div');
    this.renderer.setProperty(tempDiv, 'innerHTML', this.BlogData.description);

    const headingTags = tempDiv.querySelectorAll('h2');
    const tocList = this.renderer.createElement('ul');
    let index = 0;
    if (headingTags && headingTags.length > 0) {
      const headingArray = Array.prototype.slice.call(headingTags); // Convert NodeList to Array

      headingArray?.forEach((heading: { textContent: any }) => {
        const id = `heading-${index++}`;
        const hashId = heading.textContent
          .replace(/[^a-zA-Z0-9 ]/g, '')
          .replace(/\s+/g, ' ')
          .trim()
          .split(' ')
          .join('-');
        this.renderer.setAttribute(heading, 'id', hashId);

        const listItem = this.renderer.createElement('li');
        const anchor = this.renderer.createElement('a');

        // Generate the router link
        const currentRoute = this.router.url.split('#')[0]; // Get the current route without fragment
        this.renderer.setAttribute(anchor, 'href', `${currentRoute}#${hashId}`);
        this.renderer.setProperty(
          anchor,
          'textContent',
          heading.textContent || ''
        );
        this.renderer.appendChild(listItem, anchor);
        this.renderer.appendChild(tocList, listItem);
      });

      const firstParagraph = tempDiv.querySelector('p');
      if (firstParagraph) {
        const tocAccordion = this.renderer.createElement('div');
        this.renderer.setAttribute(tocAccordion, 'class', 'accordion my-4');
        this.renderer.setAttribute(tocAccordion, 'id', 'tocAccordion');

        const tocCard = this.renderer.createElement('div');
        this.renderer.setAttribute(
          tocCard,
          'class',
          'accordion-item table-of-content '
        );

        const tocCardHeader = this.renderer.createElement('h2');
        this.renderer.setAttribute(
          tocCardHeader,
          'class',
          'accordion-header px-3'
        );
        this.renderer.setAttribute(tocCardHeader, 'id', 'headingToc');

        const tocButton = this.renderer.createElement('button');
        this.renderer.setAttribute(
          tocButton,
          'class',
          'accordion-button tableOfContentBtn font-34-19 collapsed'
        );
        this.renderer.setAttribute(tocButton, 'type', 'button');
        this.renderer.setAttribute(tocButton, 'id', 'tableOfContentBtn');
        this.renderer.setAttribute(tocButton, 'data-bs-toggle', 'collapse');
        this.renderer.setAttribute(tocButton, 'data-bs-target', '#collapseToc');
        this.renderer.setAttribute(tocButton, 'aria-expanded', 'true');
        this.renderer.setAttribute(tocButton, 'aria-controls', 'collapseToc');
        this.renderer.setProperty(
          tocButton,
          'textContent',
          'Table of Contents'
        );

        this.renderer.appendChild(tocCardHeader, tocButton);
        this.renderer.appendChild(tocCard, tocCardHeader);

        const tocCollapse = this.renderer.createElement('div');
        this.renderer.setAttribute(tocCollapse, 'id', 'collapseToc');
        this.renderer.setAttribute(
          tocCollapse,
          'class',
          'accordion-collapse collapse'
        );
        this.renderer.setAttribute(
          tocCollapse,
          'aria-labelledby',
          'headingToc'
        );
        this.renderer.setAttribute(
          tocCollapse,
          'data-bs-parent',
          '#tocAccordion'
        );

        const tocCardBody = this.renderer.createElement('div');
        this.renderer.setAttribute(tocCardBody, 'class', 'accordion-body');

        this.renderer.appendChild(tocCardBody, tocList);
        this.renderer.appendChild(tocCollapse, tocCardBody);
        this.renderer.appendChild(tocCard, tocCollapse);
        this.renderer.appendChild(tocAccordion, tocCard);

        this.renderer.insertBefore(
          firstParagraph.parentNode,
          tocAccordion,
          firstParagraph.nextSibling
        );
      }

      this.processedHtml = this.sanitizer.bypassSecurityTrustHtml(
        tempDiv.innerHTML
      );
    } else {
      this.processedHtml = this.BlogData.description;
    }
  }

  reinitializeCarousel(): void {
    if (this.slickModal) {
      this.slickModal.unslick(); // Unslick the current instance
      this.cdr.detectChanges(); // Apply changes
      this.slickModal.initSlick(); // Reinitialize slick
    }
  }
  validateForm() {
    this.submitted = true;
    if (this.CommentForm.invalid) {
      return;
    }
    const formData = this.CommentForm.value;
    this.formApiService.submitBlogComment(formData).subscribe(
      (response) => {
        this.commentSubmission = true;
        console.log('Form submitted successfully:', response);
      },
      (error) => {
        console.error('Error submitting form:', error);
        alert('Error submitting form. Please try again.');
      }
    );
  }
  validateSubscribeForm() {
    this.SubscribeFormsubmitted = true;
    if (this.SubscribeForm.invalid) {
      return;
    }
    const formId = '15539b1c-0561-41cb-9e07-b21dd901ad3d';
    const formData = this.SubscribeForm.value;
    this.hubspotService.submitForm(formId, formData).subscribe(
      (response) => {
        console.log('Form submitted successfully:', response);
        this.subscribeSuccess = true;
      },
      (error) => {
        console.error('Error submitting form:', error);
        alert('Error submitting form. Please try again.');
      }
    );
  }
  exactLengthValidator(requiredLength: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value.replace(/\D/g, ''); // Remove non-digit characters
      return value.length === requiredLength
        ? null
        : { exactLength: { requiredLength, actualLength: value.length } };
    };
  }

  shareOnFacebook() {
    if (isPlatformBrowser(this.platformId)) {
      const pageLink = window.location.href;
      const pageTitle = String(document.title).replace(/\&/g, '%26');
      window.open(
        `http://www.facebook.com/sharer.php?u=${encodeURIComponent(
          pageLink
        )}&quote=${encodeURIComponent(pageTitle)}`,
        'sharer',
        'toolbar=0,status=0,width=626,height=436'
      );
      return false;
    }
    return undefined;
  }

  shareOnTwitter() {
    if (isPlatformBrowser(this.platformId)) {
      const pageLink = window.location.href;
      const pageTitle = String(document.title).replace(/\&/g, '%26');
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          pageTitle
        )}&url=${encodeURIComponent(pageLink)}`,
        'sharer',
        'toolbar=0,status=0,width=626,height=436'
      );
      return false;
    }
    return undefined;
  }

  shareOnLinkedIn() {
    if (isPlatformBrowser(this.platformId)) {
      const pageLink = window.location.href;
      const pageTitle = String(document.title).replace(/\&/g, '%26');
      window.open(
        `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          pageLink
        )}&title=${encodeURIComponent(pageTitle)}`,
        'sharer',
        'toolbar=0,status=0,width=626,height=436'
      );
      return false;
    }
    return undefined;
  }

  shareOnPinterest() {
    if (isPlatformBrowser(this.platformId)) {
      const pageLink = window.location.href;
      const pageTitle = String(document.title).replace(/\&/g, '%26');
      window.open(
        `https://www.pinterest.com/pin/create/button/?&text=${encodeURIComponent(
          pageTitle
        )}&url=${encodeURIComponent(pageLink)}&description=${encodeURIComponent(
          pageTitle
        )}`,
        'sharer',
        'toolbar=0,status=0,width=626,height=436'
      );
      return false;
    }
    return undefined;
  }

  slideConfig = {
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    dots: true,
    arrows: false,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
}
