import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../../../services/seo/seo.service';
import { SeoData } from '../../../../../services/seo/seo-data.model';
import { FaqComponent } from '../../../../../components/HomeComponents/faq/faq.component';
import { KnowBestComponent } from '../../../../../components/HomeComponents/know-best/know-best.component';
import { ServiceCaseStudyComponent } from '../../../../../components/HomeComponents/service-case-study/service-case-study.component';
import { CdnUrlDirective } from '../../../../../directives/cdn-url.directive';
import { ourAssetsComponent } from "../../../../../components/HomeComponents/ourAssets/ourAssets.component";

@Component({
  selector: 'app-financial-reporting',
  standalone: true,
  templateUrl: './financial-reporting.component.html',
  styleUrl: './financial-reporting.component.css',
  imports: [FaqComponent, KnowBestComponent, ServiceCaseStudyComponent, CdnUrlDirective,ourAssetsComponent],
})
export class FinancialReportingComponent implements OnInit {
  constructor(private seoService: SeoService) {}
  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'Improve Your Financial Reporting with FBSPL',
      description:
        'From accurate data analysis to detailed reporting, we handle your financial report management for bookkeeping and accounting. Check out our services today.',
      keywords: 'financial reporting',
      ogImage: '/accoutning Financial Reporting/Main-banner.jpg'
    };
    this.seoService.setMetaTags(seoData);
  }
}
