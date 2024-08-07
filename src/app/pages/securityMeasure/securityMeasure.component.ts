import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo/seo.service';
import { SeoData } from '../../services/seo/seo-data.model';
import { DOCUMENT } from '@angular/common';
import { CdnUrlDirective } from '../../directives/cdn-url.directive';
@Component({
  selector: 'app-securityMeasure',
  standalone: true,
  imports: [CommonModule, RouterLink,CdnUrlDirective],
  templateUrl: './securityMeasure.component.html',
  styleUrl: './securityMeasure.component.css',
})
export class securityMeasureComponent implements OnInit {
  constructor(
    private seoService: SeoService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'Security Measures | FBSPL',
      description:
        'FBSPL prioritizes data security with robust technical, operational, and managerial controls. Learn about CIA triad implementation, disaster recovery, and how we safeguard your information.',
      keywords: 'Security Measures, data protection, data security',
      ogImage: '/Security-Measures/SecurityMeasuresBanner.jpg'
    };
    this.seoService.setMetaTags(seoData);
  }
}
