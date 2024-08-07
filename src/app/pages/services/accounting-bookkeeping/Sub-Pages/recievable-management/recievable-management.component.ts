import { Component,OnInit } from '@angular/core';
import { SeoService } from '../../../../../services/seo/seo.service';
import { SeoData } from '../../../../../services/seo/seo-data.model';
import { FaqComponent } from '../../../../../components/HomeComponents/faq/faq.component';
import { KnowBestComponent } from '../../../../../components/HomeComponents/know-best/know-best.component';
import { ServiceCaseStudyComponent } from "../../../../../components/HomeComponents/service-case-study/service-case-study.component";
import { CdnUrlDirective } from '../../../../../directives/cdn-url.directive';
import { ourAssetsComponent } from "../../../../../components/HomeComponents/ourAssets/ourAssets.component";

@Component({
    selector: 'app-recievable-management',
    standalone: true,
    templateUrl: './recievable-management.component.html',
    styleUrl: './recievable-management.component.css',
    imports: [
    FaqComponent, KnowBestComponent,
    ServiceCaseStudyComponent, CdnUrlDirective,
    ourAssetsComponent
]
})
export class RecievableManagementComponent implements OnInit {
  constructor(private seoService: SeoService) { }
  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'Outsource Accounts Receivable Management Servies | FBSPL',
      description:
        'Outsource your accounts receivables management services at FBSPL expert team to transform your cash flow management, accelerate payments and more. Call today for a free consultation.',
      keywords: 'outsource accounts receivable management, outsource accounts receivable',
      ogImage: '/accoutning Receivable Management/Accounts Receivable.jpg'
    };
    this.seoService.setMetaTags(seoData);
  }
}
