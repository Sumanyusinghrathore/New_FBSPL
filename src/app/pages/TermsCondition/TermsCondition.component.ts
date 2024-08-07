import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo/seo.service';
import { SeoData } from '../../services/seo/seo-data.model';
import { CdnUrlDirective } from '../../directives/cdn-url.directive';
@Component({
  selector: 'app-TermsCondition',
  standalone: true,
  imports: [CommonModule, RouterLink, CdnUrlDirective],
  templateUrl: './TermsCondition.component.html',
  styleUrl: './TermsCondition.component.css',
})
export class TermsConditionComponent implements OnInit {
  constructor(private seoService: SeoService) {}
  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'Terms & Conditions | FBSPL',
      description:
        'Review the Terms & Conditions of FBSPL to understand the rules and guidelines for using our services.',
      keywords: 'Terms & Conditions, Terms of Service, User Agreement',
      ogImage: '/Sub-service-Pages/policy 1 1.png',
    };
    this.seoService.setMetaTags(seoData);
  }
}
