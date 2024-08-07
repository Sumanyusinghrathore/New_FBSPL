import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from '../../../services/seo/seo.service';
import { SeoData } from '../../../services/seo/seo-data.model';
import { subPodcastService } from '../../../services/subPodcast/subPodcast.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  SlickCarouselModule,
  SlickCarouselComponent,
} from 'ngx-slick-carousel';
import { RouterLink } from '@angular/router';
import { CdnUrlDirective } from '../../../directives/cdn-url.directive';

type ButtonType = 'AboutTheEpisodes' | 'InsightsQuickRecap';

type PossibilityBtn = 'ourGuest' | 'ourSpeaker';

interface Content {
  imageSrc: string;
  imageAlt: string;
  name: string;
  linkedinUrl: string;
  title: string;
  company: string;
  companyUrl: string;
  description: string;
}

@Component({
  selector: 'podcast-inner-page',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule, RouterLink, CdnUrlDirective],
  templateUrl: './podcast-page.component.html',
  styleUrl: './podcast-page.component.css',
})
export class PodcastPageComponent implements OnInit {
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  slug!: string;
  otherPodcasts: any = [];
  PodcastApiData: any = {};
  PodcastData: any;
  activeButton: ButtonType = 'AboutTheEpisodes';
  activePosiblityBtn: PossibilityBtn = 'ourGuest';
  safeUrl: SafeResourceUrl | null = null;

  constructor(
    private route: ActivatedRoute,
    private SubPodcastService: subPodcastService,
    private seoService: SeoService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  hasApiData(): boolean {
    return this.PodcastApiData && Object.keys(this.PodcastApiData).length > 0;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params);
      this.slug = params.get('slug') || '';
      if (this.slug) {
        this.loadPodcast(this.slug);
      } else {
        console.error('Slug is null');
      }
    });
  }

  setSeo(): void {
    const seoData: SeoData = {
      title: this.PodcastData?.meta_title,
      description: this.PodcastData?.meta_description,
      keywords: this.PodcastData?.keywords,
      ogImage: this.PodcastData?.feature_image,
      author: this.PodcastData?.written_by,
    };
    this.seoService.setMetaTags(seoData);
  }

  loadPodcast(slug: string): void {
    this.activeButton = 'AboutTheEpisodes';
    this.activePosiblityBtn = 'ourGuest';
    this.SubPodcastService.getSubPodcastData(slug).subscribe(
      (data) => {
        this.PodcastApiData = data.data;
        this.PodcastData = this.PodcastApiData.podcast;
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.PodcastData.audio
        );
        this.otherPodcasts = this.PodcastApiData.otherPodcasts;
        this.setSeo();
        this.reinitializeCarousel();
      },
      (error) => {
        this.router.navigate(['/podcast']);
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

  showDiv(buttonId: ButtonType) {
    this.activeButton = buttonId;
  }

  showPossiblityDiv(buttonId: PossibilityBtn) {
    this.activePosiblityBtn = buttonId;
  }

  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    dots: true,
    arrows: false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, // Adjusted breakpoint for tablets
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 768, // Adjusted breakpoint for small tablets/large phones
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };
}
