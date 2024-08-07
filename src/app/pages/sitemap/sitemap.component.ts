import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo/seo.service';
import { SeoData } from '../../services/seo/seo-data.model';
import { DOCUMENT } from '@angular/common';
import { CdnUrlDirective } from '../../directives/cdn-url.directive';
import { environment } from '../../../environments/environment';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, CdnUrlDirective],
  templateUrl: './sitemap.component.html',
  styleUrl: './sitemap.component.css',
})
export class SiteMapComponent implements OnInit {
  constructor(
    private seoService: SeoService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  cdnUrl = environment.cdnUrl;
  ISO2700 = `${this.cdnUrl}assets/home/FBSPL-ISO 27001.pdf`;
  ISO9001 = `${this.cdnUrl}assets/home/FBSPL-QMS.pdf`;
  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'Sitemap | FBSPL',
      description:
        'FBSPL is a global consulting and business process management (BPM) firm serving in insurance, e-commerce, accounting, digital, and data annotation businesses. Use the sitemap to make your way around our website.',
      keywords: 'FBSPL Sitemap',
      ogImage: '/meta/thankyou.jpg',
    };
    this.seoService.setMetaTags(seoData);
  }
}
