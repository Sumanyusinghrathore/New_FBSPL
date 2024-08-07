import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo/seo.service';
import { caseStudyService } from '../../services/caseStudy/caseStudy.service';
import { SeoData } from '../../services/seo/seo-data.model';
import { CdnUrlDirective } from '../../directives/cdn-url.directive';

@Component({
  selector: 'app-case-study',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule, RouterLink, CdnUrlDirective],
  templateUrl: './case-study.component.html',
  styleUrls: ['./case-study.component.css'],
})
export class CaseStudyComponent implements OnInit {
  @ViewChild('top') top!: ElementRef;
  ApiData: any = {};
  caseStudies: any[] = [];
  currentPage = 1;
  currentCategory: string = '';
  pages: (number | string)[] = [];
  Errormessage: string = '';
  APIerror: boolean = false;

  constructor(
    private seoService: SeoService,
    private caseStudyService: caseStudyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.clearValues();
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        this.currentCategory = fragment;
        this.loadCaseStudy();
      } else {
        this.loadCaseStudy();
      }
    });
    const seoData: SeoData = {
      title: 'FBSPL Cases Library | Case Studies | Success Stories',
      description:
        'Our case studies shows how our BPO services help businesses navigate through challenges and deliver the value and result our clients expect.',
      keywords: 'case studies, success stories',
      ogImage: '/caseStudy/caseStudyBanner.jpg',
    };

    this.seoService.setMetaTags(seoData);
  }

  loadCaseStudy(): void {
    this.top?.nativeElement.scrollIntoView({ top: -20, behavior: 'smooth' });
    this.caseStudies = [];
    this.pages = [];
    this.APIerror = false;
    this.caseStudyService
      .getcaseStudyData(this.currentCategory, this.currentPage)
      .subscribe(
        (data) => {
          this.ApiData = data.data;
          this.caseStudies = this.ApiData.data;
          this.generatePages();
        },
        (error) => {
          this.APIerror = true;
          this.Errormessage = error.error.message;
          console.error('Error fetching blog data', error);
        }
      );
  }

  slider = [
    {
      count: '43%',
      description:
        'Insurance talent find it challenging to recruit skilled candidates, especially in areas like claims.',
    },
    {
      count: '61%',
      description:
        'Insurance talent find it challenging to recruit skilled candidates, especially in areas like claims.',
    },
    {
      count: '40%',
      description:
        'Insurance talent find it challenging to recruit skilled candidates, especially in areas like claims.',
    },
    {
      count: '54%',
      description:
        'Insurance talent find it challenging to recruit skilled candidates, especially in areas like claims.',
    },
  ];
  slideConfigMob = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,
    arrows: false,
    autoplaySpeed: 4000,
  };
  menuItems = [
    {
      name: 'Industries',
      isOpen: false,
      subItems: [
        { href: 'ecommerce', text: 'E-commerce' },
        { href: 'insurance', text: 'Insurance' },
        { href: 'realestate', text: 'Real estate' },
      ],
    },
    {
      name: 'Services',
      isOpen: false,
      subItems: [
        { href: 'insurance', text: 'Insurance' },
        {
          href: 'accounting&bookkeeping',
          text: 'Accounting & Bookkeeping',
        },
        { href: 'ecommerce', text: 'E-commerce' },
        { href: 'recruitment', text: 'Recruitment' },
        { href: 'customerSupport', text: 'Customer Support' },
        { href: 'dataAnnotation', text: 'Data Annotation' },
        {
          href: 'insuranceagencyoptimization',
          text: 'Insurance Agency Optimization',
        },
        { href: 'digitalmarketing', text: 'Digital Marketing' },
        { href: 'other', text: 'Other' },
      ],
    },
  ];

  toggleMenu(item: any) {
    this.menuItems.forEach((menuItem) => {
      menuItem.isOpen = menuItem === item ? !menuItem.isOpen : false;
    });
  }

  isAnyMenuOpen(): boolean {
    return this.menuItems.some((item) => item.isOpen);
  }

  changePage(page: number | string): void {
    if (typeof page === 'number') {
      this.currentPage = page;
      this.loadCaseStudy();
    }
  }

  generatePages(): void {
    this.pages = [];
    const totalPages = this.ApiData.last_page;
    this.currentPage = this.ApiData.current_page;
    // const lastPage = this.ApiData.last_page;
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= this.currentPage - 2 && i <= this.currentPage + 2)
      ) {
        this.pages.push(i);
      } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
        this.pages.push('...');
      }
    }
  }

  clearValues(): void {
    this.ApiData = [];
    this.pages = [];
    this.currentCategory = '';
    this.APIerror = false;
    this.Errormessage = '';
  }
}
