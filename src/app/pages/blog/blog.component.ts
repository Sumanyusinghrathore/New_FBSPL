import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  SlickCarouselComponent,
  SlickCarouselModule,
} from 'ngx-slick-carousel';

import { SeoService } from '../../services/seo/seo.service';

import { BlogService } from '../../services/blog/blog.service';
import { SeoData } from '../../services/seo/seo-data.model';
import { CdnUrlDirective } from '../../directives/cdn-url.directive';
@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SlickCarouselModule,
    FormsModule,
    CdnUrlDirective,
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent implements OnInit {
  @ViewChild('top') top!: ElementRef;
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  ApiData: any = {};
  blogData: any = [];
  featuredBlogs: any;
  APIerror: boolean = false;
  Errormessage: string = '';
  currentCategory: string = '';
  perPage: number = 6;
  currentPage: number = 1;
  searchTerm: string = '';
  activeCategory = [
    'insurance',
    'ecommerce',
    'accountingandbookkeeping',
    'customerSupport',
    'recruitment',
    'customerSupport',
    'dataAnnotation',
    'other',
  ];
  pages: any = [];
  constructor(
    private seoService: SeoService,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  hasApiData(): boolean {
    return this.ApiData && Object.keys(this.ApiData).length > 0;
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
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1000,
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
  ngOnInit(): void {
    this.clearValues();
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        if (this.activeCategory.includes(fragment)) {
          this.currentCategory = fragment;
        }
        this.loadBlogs();
      } else {
        this.loadBlogs(); // Load default category if no fragment
      }
    });
    const seoData: SeoData = {
      title: 'Industry Insights & Trends: FBSPL Blogs',
      description:
        'Read on latest industry trends, expert insights, digital transformation, and tips for your business. Keep yourself informed and inspired with our most recent updates.',
      keywords: 'blogs, industry trends',
      ogImage: '/blog/BlogBanner.jpg',
    };

    this.seoService.setMetaTags(seoData);
  }

  loadBlogs(): void {
    this.blogService
      .getBlogData(
        this.currentCategory,
        this.searchTerm,
        this.perPage,
        this.currentPage
      )
      .subscribe(
        (data) => {
          this.pages = [];
          this.ApiData = data;
          if ((this.ApiData.status = 1)) {
            this.APIerror = false;

            this.blogData = this.modifyArray(this.ApiData.data.data);
            this.generatePages();
            this.featuredBlogs = this.modifyArray(this.ApiData.featured_blogs);
            this.reinitializeCarousel();
          } else {
            this.featuredBlogs = this.modifyArray(this.ApiData.featured_blogs);
            this.APIerror = true;
          }
        },
        (error) => {
          this.APIerror = true;
          this.Errormessage = error.error.message;
          console.error('Error fetching blog data', error);
        }
      );
  }

  reinitializeCarousel(): void {
    if (this.slickModal) {
      this.slickModal.unslick(); // Unslick the current instance
      this.cdr.detectChanges(); // Apply changes
      this.slickModal.initSlick(); // Reinitialize slick
    }
  }

  generatePages(): void {
    this.pages = [];
    const totalPages = this.ApiData.data.last_page;
    this.currentPage = this.ApiData.data.current_page;
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
  modifyArray(array: any[]) {
    if (array.length > 0) {
      array.forEach((item) => {
        if (item.title && item.title.length > 80) {
          item.showTitle = item.title.substring(0, 80) + '...';
        } else {
          item.showTitle = item.title;
        }
      });
    }
    return array;
  }

  changePage(page: number | string): void {
    if (typeof page === 'number') {
      this.currentPage = page;
      this.top?.nativeElement.scrollIntoView({ top: -20, behavior: 'smooth' });
      this.loadBlogs();
    }
  }

  onSearch(): void {
    this.clearValues();
    this.currentPage = 1; // Reset to first page
    this.loadBlogs();
  }
  clearValues(): void {
    this.blogData = [];
    this.pages = [];
    this.currentCategory = '';
    this.APIerror = false;
    this.Errormessage = '';
  }
}
