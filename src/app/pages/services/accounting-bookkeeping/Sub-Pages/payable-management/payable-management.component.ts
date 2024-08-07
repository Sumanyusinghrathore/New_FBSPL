import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../../../services/seo/seo.service';
import { SeoData } from '../../../../../services/seo/seo-data.model';
import { FaqComponent } from '../../../../../components/HomeComponents/faq/faq.component';
import { KnowBestComponent } from '../../../../../components/HomeComponents/know-best/know-best.component';
import { ServiceCaseStudyComponent } from '../../../../../components/HomeComponents/service-case-study/service-case-study.component';
import { CdnUrlDirective } from '../../../../../directives/cdn-url.directive';
import { ourAssetsComponent } from '../../../../../components/HomeComponents/ourAssets/ourAssets.component';

@Component({
  selector: 'app-payable-management',
  standalone: true,
  templateUrl: './payable-management.component.html',
  styleUrl: './payable-management.component.css',
  imports: [FaqComponent, KnowBestComponent, ServiceCaseStudyComponent,CdnUrlDirective,ourAssetsComponent],
})
export class PayableManagementComponent implements OnInit {
  constructor(private seoService: SeoService) {}
  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'Outsourcing Accounts Payable Services  | FBSPL',
      description:
        "Outsource your accounts payable with FBSPL's advanced technologies to achieve accuracy and elevate financial productivity effortlessly.",
      keywords: 'outsource accounts payable, accounts payable management',
      ogImage: '/accoutning Payable Management/Payable Management-banner-1.jpg',
    };
    this.seoService.setMetaTags(seoData);
  }
}
