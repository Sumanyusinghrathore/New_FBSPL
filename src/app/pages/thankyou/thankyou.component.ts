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
import ThankyouAnimation from '../../../assets/Animations/Thankyou Page.json';

@Component({
  selector: 'app-Thankyou',
  standalone: true,
  imports: [CommonModule, RouterLink, CdnUrlDirective],
  templateUrl: './thankyou.component.html',
  styleUrl: './thankyou.component.css',
})
export class ThankyouComponent implements OnInit, AfterViewInit {
  constructor(
    private seoService: SeoService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  cdnUrl = environment.cdnUrl;
  ngOnInit(): void {
    const seoData: SeoData = {
      title:
        'Thank You for Contacting Us | Your Inquiry Has Been Received | FBSPL',
      description:
        'Thank you for reaching out! We appreciate your interest and will respond to your inquiry shortly. Check out our website to learn about our services and how we assist you.',
      keywords: 'Thank you page, Inquiry received',
      ogImage: '/meta/thankyou.jpg',
    };
    this.seoService.setMetaTags(seoData);
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
}
