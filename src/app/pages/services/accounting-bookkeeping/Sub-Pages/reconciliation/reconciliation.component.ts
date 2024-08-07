import { Component ,OnInit} from '@angular/core';
import { SeoService } from '../../../../../services/seo/seo.service';
import { SeoData } from '../../../../../services/seo/seo-data.model';
import { FaqComponent } from '../../../../../components/HomeComponents/faq/faq.component';
import { KnowBestComponent } from '../../../../../components/HomeComponents/know-best/know-best.component';
import { ServiceCaseStudyComponent } from "../../../../../components/HomeComponents/service-case-study/service-case-study.component";
import { CdnUrlDirective } from '../../../../../directives/cdn-url.directive';
import { ourAssetsComponent } from "../../../../../components/HomeComponents/ourAssets/ourAssets.component";

@Component({
    selector: 'app-reconciliation',
    standalone: true,
    templateUrl: './reconciliation.component.html',
    styleUrl: './reconciliation.component.css',
    imports: [
    FaqComponent, KnowBestComponent,
    ServiceCaseStudyComponent, CdnUrlDirective,
    ourAssetsComponent
]
})
export class ReconciliationComponent implements OnInit {
  constructor(private seoService: SeoService) { }
  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'Outsourced Account Reconciliation Solutions | FBSPL',
      description:
        'FBSPL provides accounts reconciliation services: bank statement, credit card reconciliation, ledger management, and more. Simplify your financial processes today.',
      keywords: 'accounts reconciliation services, financial processes ',
      ogImage: '/accoutning_Account_Reconciliation/main-banner.jpg'
    };
    this.seoService.setMetaTags(seoData);
  }
}
