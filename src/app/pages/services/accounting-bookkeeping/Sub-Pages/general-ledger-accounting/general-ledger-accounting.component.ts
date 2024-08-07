import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../../../services/seo/seo.service';
import { SeoData } from '../../../../../services/seo/seo-data.model';
import { FaqComponent } from '../../../../../components/HomeComponents/faq/faq.component';
import { KnowBestComponent } from '../../../../../components/HomeComponents/know-best/know-best.component';
import { ServiceCaseStudyComponent } from "../../../../../components/HomeComponents/service-case-study/service-case-study.component";
import { CdnUrlDirective } from '../../../../../directives/cdn-url.directive';
import { ourAssetsComponent } from "../../../../../components/HomeComponents/ourAssets/ourAssets.component";

@Component({
    selector: 'app-general-ledger-accounting',
    standalone: true,
    templateUrl: './general-ledger-accounting.component.html',
    styleUrl: './general-ledger-accounting.component.css',
    imports: [
    FaqComponent, KnowBestComponent,
    ServiceCaseStudyComponent, CdnUrlDirective,
    ourAssetsComponent
]
})
export class GeneralLedgerAccountingComponent implements OnInit {
  constructor(private seoService: SeoService) { }
  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'Outsource Expert General Ledger Accounting Services - FBSPL | Accurate & Efficient Management',
      description:
        'Get accurate and reliable general ledger accounting services with FBSPL. We specialize in accounting process outsourcing and management. Contact us today.',
        keywords:'general ledger accounting services, ledger management',
        ogImage:'/accoutning genral ledger/main-banner.jpg'
    };
    this.seoService.setMetaTags(seoData);
  }
}