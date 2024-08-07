import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo/seo.service';
import { SeoData } from '../../services/seo/seo-data.model';
import { DOCUMENT } from '@angular/common';
import { CdnUrlDirective } from '../../directives/cdn-url.directive';
@Component({
  selector: 'app-PrivacyPolicy',
  standalone: true,
  imports: [CommonModule, RouterLink,CdnUrlDirective],
  templateUrl: './PrivacyPolicy.component.html',
  styleUrl: './PrivacyPolicy.component.css',
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(
    private seoService: SeoService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'Privacy Policy | FBSPL',
      description:
        "Read FBSPL's Privacy Policy to understand how we collect, use, and protect your personal information. Your privacy is our priority.",
      keywords: 'Privacy Policy, Data Protection, User Privacy',
      ogImage: '/Privacy-Policy/Privacy Banner.jpg'
    };
    this.seoService.setMetaTags(seoData);
  }
}
