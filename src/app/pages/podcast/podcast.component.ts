import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import {
  SlickCarouselComponent,
  SlickCarouselModule,
} from 'ngx-slick-carousel';

import { SeoService } from '../../services/seo/seo.service';
import { SeoData } from '../../services/seo/seo-data.model';
import { PodcastService } from '../../services/podcast/podcast.service';
import { YoutubeModalComponent } from '../../components/youtube-modal/youtube-modal.component';
import { DeviceDetectorService } from '../../services/deviceDetection/deviceDetection.service';
import { CdnUrlDirective } from '../../directives/cdn-url.directive';
declare var bootstrap: any;

@Component({
  selector: 'app-podcast',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    SlickCarouselModule,
    YoutubeModalComponent,
    CdnUrlDirective,
  ],
  templateUrl: './podcast.component.html',
  styleUrl: './podcast.component.css',
})
export class PodcastComponent implements OnInit {
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  @ViewChild('top') top!: ElementRef;
  ApiData: any = {};
  MeetHost: any;
  PodcastData: any = [];
  TrendingPodcast: any = [];
  FeaturePodcast: any;
  perPage: number = 6;
  currentPage: number = 1;
  pages: any = [];
  constructor(
    private seoService: SeoService,
    private podcastService: PodcastService,
    private deviceDetector: DeviceDetectorService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (this.deviceDetector.isMobile()) {
      this.perPage = 4;
    }
    const seoData: SeoData = {
      title: 'Podcast | Business Transformation Insights by FBSPL',
      description:
        'Tune in to our podcast for valuable insights on business transformation by FBSPL. Learn how to optimize your business for success with our business enthusiast host, KB.',
      keywords: 'podcast, business transformation podcast',
      ogImage: '/podcast/Podcast Banner.png',
    };
    this.seoService.setMetaTags(seoData);
    this.loadPodcasts();
  }

  hasApiData(): boolean {
    return this.ApiData && Object.keys(this.ApiData).length > 0;
  }

  loadPodcasts(): void {
    this.podcastService
      .getPodcastData(this.perPage, this.currentPage)
      .subscribe(
        (data) => {
          this.ApiData = data;
          this.generatePages();
          this.MeetHost = this.ApiData.meet_our_host_episode;
          this.PodcastData = this.ApiData.data;
          this.FeaturePodcast = this.ApiData.featured_podcasts[0];
          this.TrendingPodcast = this.ApiData.most_trending_episodes;
          this.reinitializeCarousel();
        },
        (error) => {
          this.router.navigate(['/podcast']);
          console.error('Error fetching podcast data', error);
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
    const totalPages = this.ApiData.pagination.last_page;
    this.currentPage = this.ApiData.pagination.current_page;
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

  changePage(page: number | string): void {
    if (typeof page === 'number') {
      this.currentPage = page;
      this.top?.nativeElement.scrollIntoView({ top: -20, behavior: 'smooth' });
      this.loadPodcasts();
    }
  }
  currentYouTubeUrl: string = '';

  openModal(url: string) {
    this.currentYouTubeUrl = url;
    const modalElement = document.getElementById('youtubeModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  share(data: any) {
    if (data && navigator.share) {
      navigator
        .share({
          title: 'FBSPL | PODCAST',
          text: 'FBSPL',
          url: `https://www.fbspl.com/podcast/${data.slug}`,
        })
        .then(() => {
          console.log('Successfully shared');
        })
        .catch((error) => {
          console.error('Error sharing:', error);
        });
    } else {
      console.error('Web Share API is not supported in your browser.');
    }
  }
  slides = [
    {
      img: 'assets/podcast/kb-sir-vector.png',
      heading:
        'Episode 1 : TRANSFORM & ROLL OUT! Meet your Business Transformation Podcast Host',
    },
    {
      img: 'assets/podcast/kb-sir-vector.png',
      heading:
        'Episode 8 : Navigating the Insurance Landscape: Changing Dynamics in the Industry with Bryan Falchuk',
    },
    {
      img: 'assets/podcast/kb-sir-vector.png',
      heading:
        'Episode 1 : TRANSFORM & ROLL OUT! Meet your Business Transformation Podcast Host',
    },
  ];
  slideConfig = {
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    dots: true,
    arrows: false,
    prevArrow: false,
    nextArrow: false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 0.5,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 0.5,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };
}
