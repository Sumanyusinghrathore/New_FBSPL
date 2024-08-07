import {
  Component,
  AfterViewInit,
  OnInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import bodymovin from 'lottie-web';
import { SeoService } from '../../services/seo/seo.service';
import { SeoData } from '../../services/seo/seo-data.model';
import { DOCUMENT } from '@angular/common';
import { CdnUrlDirective } from '../../directives/cdn-url.directive';
import { environment } from '../../../environments/environment';
import errorAnimation from '../../../assets/Animations/404.json';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule, RouterLink, CdnUrlDirective],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent implements OnInit, AfterViewInit {
  constructor(
    private seoService: SeoService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'Page Not Found | 404 Error',
      description:
        "Oops! The page you are looking for does not exist. Please check the URL or return to our homepage for more information. We're here to help you find what you need.",
      keywords: '404 error, Page not found,Missing page',
      ogImage: '/meta/404.jpg',
    };
    this.seoService.setMetaTags(seoData);
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Animation initialization code
      const animationInline1 = bodymovin.loadAnimation({
        container: document.getElementById('animationError') as HTMLElement,
        autoplay: true,
        renderer: 'svg',
        loop: true,
        animationData: errorAnimation,
      });
    }
  }
}
