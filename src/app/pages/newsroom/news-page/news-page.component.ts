import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';

import { SeoService } from '../../../services/seo/seo.service';
import { SeoData } from '../../../services/seo/seo-data.model';
import { SubNewsService } from '../../../services/subNews/subNews.service';
import { CdnUrlDirective } from '../../../directives/cdn-url.directive';
import { PLATFORM_ID } from '@angular/core';
@Component({
  selector: 'app-news-page',
  standalone: true,
  imports: [CommonModule, RouterLink, CdnUrlDirective],
  templateUrl: './news-page.component.html',
  styleUrl: './news-page.component.css',
})
export class NewsPageComponent implements OnInit {
  slug!: string;
  NewsData: any = {};
  ApiData: any = {};

  constructor(
    private route: ActivatedRoute,
    private seoService: SeoService,
    private SubNewsService: SubNewsService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.slug = params.get('slug') || '';
      if (this.slug) {
        this.loadNewPost(this.slug);
      } else {
        console.error('Slug is null');
      }
      this.handleBodyClass();
    });
  }

  private handleBodyClass() {
    let body = document.getElementById('body');
    let url = '';
    if (body !== null) {
      if (url === `/news`) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = 'visible';
      }
    }
  }

  loadNewPost(slug: string): void {
    this.SubNewsService.getSubNewsData(slug).subscribe(
      (data) => {
        this.ApiData = data;
        this.NewsData = this.ApiData.data;
        this.setSeo();
      },
      (error) => {
        if (error.error.status === 0) {
          this.router.navigate(['/404']);
        }
        console.error('Error fetching blog data', error);
      }
    );
  }

  setSeo(): void {
    const seoData: SeoData = {
      title: this.NewsData?.meta_title,
      description: this.NewsData?.meta_description,
      keywords: this.NewsData?.keywords,
      ogImage: this.NewsData?.feature_image,
    };
    this.seoService.setMetaTags(seoData);
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

  // Featuredslides = [
  //   {
  //     img: '../../../assets/news/Image.png',
  //   },
  //   {
  //     img: '../../../assets/news/Image.png',
  //   },
  // ];
  slideConfig = {
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    dots: false,
    arrows: false,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };
}
