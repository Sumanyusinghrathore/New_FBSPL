import {
  Component,
  ElementRef,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SlickCarouselModule,
  SlickCarouselComponent,
} from 'ngx-slick-carousel';
import { SeoService } from '../../services/seo/seo.service';
import { SeoData } from '../../services/seo/seo-data.model';
import { RouterLink } from '@angular/router';
import { NewsService } from '../../services/news/news.service';
import { CdnUrlDirective } from '../../directives/cdn-url.directive';

@Component({
  selector: 'app-newsroom',
  standalone: true,
  imports: [SlickCarouselModule, CommonModule, RouterLink, CdnUrlDirective],
  templateUrl: './newsroom.component.html',
  styleUrl: './newsroom.component.css',
})
export class NewsroomComponent implements OnInit {
  ApiData: any = {};
  newsData: any = [];
  featuredNews: any;
  APIerror: boolean = false;
  Errormessage: string = '';
  currentCategory: string = '';
  perPage: number = 6;
  currentPage: number = 1;
  searchTerm: string = '';
  pages: any = [];
  constructor(
    private seoService: SeoService,
    private newsService: NewsService
  ) {}
  hasApiData(): boolean {
    return this.ApiData && Object.keys(this.ApiData).length > 0;
  }
  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'Newsroom | In the New - FBSPL',
      description:
        'FBSPL Newsroom-Trending events, latest news, press releases, and more.',
      keywords: 'newsroom',
      ogImage: '/news/news_Banner.png',
    };
    this.seoService.setMetaTags(seoData);
    this.loadNews();
  }
  // Latest_news = [
  //   {
  //     img: '../../../assets/news/Trending.png',
  //   },
  //   {
  //     img: '../../../assets/news/Trending.png',
  //   },
  //   {
  //     img: '../../../assets/news/Trending.png',
  //   },
  //   {
  //     img: '../../../assets/news/Trending.png',
  //   },
  // ];
  // Latest_newsConfig = {
  //   slidesToShow: 3.5,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   dots: true,
  //   arrows: false,
  //   autoplaySpeed: 4000,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         dots: true,
  //       },
  //     },
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         dots: true,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         dots: true,
  //       },
  //     },
  //   ],
  // };
  // Press_Release = [
  //   {
  //     img: '../../../assets/news/Trending.png',
  //   },
  //   {
  //     img: '../../../assets/news/Trending.png',
  //   },
  //   {
  //     img: '../../../assets/news/Trending.png',
  //   },
  //   {
  //     img: '../../../assets/news/Trending.png',
  //   },
  // ];
  // Press_ReleaseConfig = {
  //   slidesToShow: 3.5,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   dots: true,
  //   arrows: false,
  //   autoplaySpeed: 4000,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         dots: true,
  //       },
  //     },
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         dots: true,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         dots: true,
  //       },
  //     },
  //   ],
  // };
  loadNews(): void {
    this.newsService
      .getNewsData(
        this.currentCategory,
        this.searchTerm,
        this.perPage,
        this.currentPage
      )
      .subscribe(
        (data: any) => {
          this.ApiData = data;
          if ((this.ApiData.status = 1)) {
            this.newsData = this.ApiData.data;
          } else {
            this.APIerror = true;
          }
        },
        (error: { error: { message: string } }) => {
          this.APIerror = true;
          this.Errormessage = error.error.message;
          console.error('Error fetching blog data', error);
        }
      );
  }
}
