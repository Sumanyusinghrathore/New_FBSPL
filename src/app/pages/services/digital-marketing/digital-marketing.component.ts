import { Component, OnInit } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SeoService } from '../../../services/seo/seo.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ourAssetsModule } from '../../../components/HomeComponents/ourAssets/ourAssets.module';
import { ToolsSectionModule } from '../../../components/ServiceComponent/ToolsSection/ToolsSection.module';
import { SeoData } from '../../../services/seo/seo-data.model';
import { FaqComponent } from '../../../components/HomeComponents/faq/faq.component';
import { ServiceVimeoComponent } from '../../../components/HomeComponents/service-vimeo/service-vimeo.component';
import { ServiceCaseStudyComponent } from '../../../components/HomeComponents/service-case-study/service-case-study.component';
import { ourAssetsComponent } from '../../../components/HomeComponents/ourAssets/ourAssets.component';
import { CdnUrlDirective } from '../../../directives/cdn-url.directive';
import { KnowBestComponent } from '../../../components/HomeComponents/know-best/know-best.component';
@Component({
  selector: 'app-digital-marketing',
  standalone: true,
  templateUrl: './digital-marketing.component.html',
  styleUrl: './digital-marketing.component.css',
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    SlickCarouselModule,
    ourAssetsModule,
    ToolsSectionModule,
    FaqComponent,
    ServiceVimeoComponent,
    ServiceCaseStudyComponent,
    CdnUrlDirective,
    ourAssetsComponent,KnowBestComponent
  ],
})
export class DigitalMarketingComponent implements OnInit {
  constructor(private seoService: SeoService) {}
  ngOnInit(): void {
    const seoData: SeoData = {
      title:
        'Digital Marketing Solutions for Traffic, Leads, Customer Engagement & More',
      description:
        "Build your business a strong online presence with FBSPL digital marketing services to increase traffic, leads and elevate your brand's recognition with us.",
      keywords:
        'digital marketing services, online presence, customer engagement',
      ogImage: '/digital marketing/DM Main Banner 1.jpg',
    };
    this.seoService.setMetaTags(seoData);
  }
  // slides = [
  //   {
  //     banner:true,
  //     img: '../../../assets/Service-slider/Insurance-Slider Image-1.png',
  //     img_mob: '../../../assets/Service-slider/Insurance-Slider ImageMob-1.png',
  //     Title: 'B2B Digital Marketing Services  ',
  //     Description:
  //       'Create a digital experience that lasts longer! Overcome your growth stagnation, and witness increased ROI with our bespoke digital marketing services. We are not just about quick fixes; our digital marketing solutions aim for sustainable success.',
  //       digitalmarketing: 'Connect with Marketing Experts',
  //       Link:"/book-free-consultation-call"
  //   },
  //   {
  //     banner:false,
  //     img: '../../../assets/Service-slider/Insurance-Slider Image-2.png',
  //     img_mob: '../../../assets/Service-slider/Insurance-Slider ImageMob-1.png',
  //     Title: 'Case Study',
  //     Description:
  //       '',
  //       digitalmarketing: 'Connect with Marketing Experts',
  //       Link:"/book-free-consultation-call"
  //   },
  //   {
  //     banner:false,
  //     img: '../../../assets/Service-slider/Insurance-Slider Image-3.png',
  //     img_mob: '../../../assets/Service-slider/Insurance-Slider ImageMob-1.png',
  //     Title: 'Blogs',
  //     Description:
  //       '',
  //       digitalmarketing: 'Connect with Marketing Experts',
  //       Link:"/book-free-consultation-call"
  //   },
  // ];
  // slideConfig = {
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   dots: true,
  //   arrows: false,
  //   prevArrow: false,
  //   nextArrow: false,
  //   autoplaySpeed: 3000,
  //   responsive: [
  //     {
  //       breakpoint: 768, // Tablet breakpoint
  //       settings: {
  //         slidesToShow: 1, // Number of slides to show on tablets
  //         slidesToScroll: 1, // Number of slides to scroll on tablets
  //         autoplay: true,
  //         prevArrow: false,
  //         nextArrow: false,
  //         dots: false, // Enable dots on tablets
  //         arrows: true // Enable arrows on tablets
  //       }
  //     },
  //     {
  //       breakpoint: 1024, // Desktop breakpoint
  //       settings: {
  //         slidesToShow: 1, // Number of slides to show on desktops
  //         slidesToScroll: 1, // Number of slides to scroll on desktops
  //         autoplay: true,
  //         prevArrow: false,
  //         nextArrow: false,
  //         dots: false, // Enable dots on desktops
  //         arrows: true // Enable arrows on desktops
  //       }
  //     }
  //   ]
  // };
}
