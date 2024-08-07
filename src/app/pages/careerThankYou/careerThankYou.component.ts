import {
  Component,
  AfterViewInit,
  OnInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import bodymovin from 'lottie-web';
import { SeoService } from '../../services/seo/seo.service';
import { SeoData } from '../../services/seo/seo-data.model';
import { DOCUMENT } from '@angular/common';
import { CdnUrlDirective } from '../../directives/cdn-url.directive';
import { environment } from '../../../environments/environment';
import ThankyouAnimation from '../../../assets/Animations/Thankyou Page.json';

@Component({
  selector: 'app-careerThankYou',
  standalone: true,
  imports: [CommonModule, RouterLink, CdnUrlDirective],
  templateUrl: './careerThankYou.component.html',
  styleUrl: './careerThankYou.component.css',
})
export class CareerThankyouComponent implements OnInit, AfterViewInit {
  queryParam: any = {};

  constructor(
    private seoService: SeoService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'Thank You for Applying to FBSPL',
      description:
        'Thank you for application to FBSPL job opening. We will review it and reach out to you soon.',
      keywords: 'job apply',
      ogImage: '/meta/thankyou.jpg',
    };

    this.seoService.setMetaTags(seoData);
    this.route.queryParams.subscribe((params) => {
      const encodedString = params['q'] || null;
      const decodedString = atob(encodedString);
      this.queryParam = JSON.parse(decodedString);
      console.log('Query parameter q:', this.queryParam);
    });
  }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      bodymovin.loadAnimation({
        container: document.getElementById('Animationthankyou') as HTMLElement,
        autoplay: true,
        renderer: 'svg',
        loop: true,
        animationData: ThankyouAnimation,
      });
    }
  }
  copyToClipboard(text: string) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  }
}
