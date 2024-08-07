import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo/seo.service';
import { SeoData } from '../../services/seo/seo-data.model';
import { CdnUrlDirective } from '../../directives/cdn-url.directive';
@Component({
  selector: 'app-GDPR',
  standalone: true,
  imports: [CommonModule, RouterLink,CdnUrlDirective],
  templateUrl: './GDPR.component.html',
  styleUrl: './GDPR.component.css',
})
export class GDPRComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'GDPR Compliance | FBSPL - Ensuring Data Privacy and Protection',
      description: 'Learn about our GDPR compliance and how we prioritize your data privacy. Our team ensures transparency and security in handling your personal information.',
      keywords: 'GDPR Compliance, General Data Protection Regulation, Data Privacy',
    };
    this.seoService.setMetaTags(seoData);
  }
}
