import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

import { SlickCarouselModule } from 'ngx-slick-carousel';

import { SeoService } from '../../../services/seo/seo.service';
import { ToolsSectionModule } from '../../../components/ServiceComponent/ToolsSection/ToolsSection.module';
import { SeoData } from '../../../services/seo/seo-data.model';
import { FaqComponent } from '../../../components/HomeComponents/faq/faq.component';
import { KnowBestComponent } from '../../../components/HomeComponents/know-best/know-best.component';
import { ServiceVimeoComponent } from '../../../components/HomeComponents/service-vimeo/service-vimeo.component';
import { ServiceCaseStudyComponent } from '../../../components/HomeComponents/service-case-study/service-case-study.component';
import { ourAssetsModule } from '../../../components/HomeComponents/ourAssets/ourAssets.module';
import { ourAssetsComponent } from '../../../components/HomeComponents/ourAssets/ourAssets.component';
import { CdnUrlDirective } from '../../../directives/cdn-url.directive';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-services',
  standalone: true,
  templateUrl: './Insurance.component.html',
  styleUrl: './Insurance.component.css',
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    SlickCarouselModule,
    ToolsSectionModule,
    FaqComponent,
    KnowBestComponent,
    ServiceVimeoComponent,
    ServiceCaseStudyComponent,
    ourAssetsModule,
    ourAssetsComponent,
    CdnUrlDirective,
  ],
})
export class Insurance implements OnInit {
  cdnUrl = environment.cdnUrl;
  constructor(private seoService: SeoService) {}
  ngOnInit(): void {
    const seoData: SeoData = {
      title:
        'Insurance Business Process Outsourcing (BPO) Services | Insurance BPM Service Providers',
      description:
        "Discover efficient insurance BPM services! Get back-office support & insurance consultation from experts. Optimize insurance processes with FBSPL's reliable outsourcing solutions for agencies, MGAs, carriers & brokers. Act now!",
      keywords: 'insurance bpm, insurance bpo services, insurance back office',
      ogImage: '/insurance-main/Insurance-Slider Image-1.png',
    };
    this.seoService.setMetaTags(seoData);
  }
  slides = [
    {
      banner: true,
      img: `${this.cdnUrl}assets/insurance-main/Insurance-Slider Image-1.png`,
      img_mob: `${this.cdnUrl}assets/insurance-main/Insurance-Slider ImageMob-1.png`,
      Title: ' Insurance Outsourcing Services',
      Description:
        'Deliver value beyond policies. Connect with us for customer-centric insurance outsourcing services. From policy processing to claims management, we have mastered it all. ',
      Bookaconsultation: 'Grow with Us',
      Link: '/book-free-consultation-call',
      alt:'FBSPL Insurance Outsourcing Services'
    },
    {
      banner: false,
      img: `${this.cdnUrl}assets/insurance-main/Insurance-Slider Image-2.png`,
      img_mob: `${this.cdnUrl}assets/insurance-main/Insurance-Slider ImageMob-2.png`,
      Title: 'Case Study',
      Description:
        'Witness the business transformation of our potential clients. Explore the significant impact on more than a thousand insurance agents, and businesses. ',
      Link: '/case-studies#insurance',
      alt:"FBSPL Insurance Case Study"
    },
    {
      banner: false,
      img: `${this.cdnUrl}assets/insurance-main/Insurance-Slider Image-3.png`,
      img_mob: `${this.cdnUrl}assets/insurance-main/Insurance-Slider ImageMob-3.png`,
      Title: 'Know What’s Trending in Insurance ',
      Description:
        'Stay ahead in the competitive insurance landscape! Discover the latest trends shaping the insurance industry, current market analysis, and more, to uncover opportunities for growth. ',
      Link: '/blogs#insurance',
      alt:"FBSPL Insurance Blogs & Latest Trends "
    },
  ];
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,
    arrows: false,
    prevArrow: false,
    nextArrow: false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768, // Tablet breakpoint
        settings: {
          slidesToShow: 1, // Number of slides to show on tablets
          slidesToScroll: 1, // Number of slides to scroll on tablets
          autoplay: true,
          prevArrow: false,
          nextArrow: false,
          dots: false, // Enable dots on tablets
          arrows: false, // Enable arrows on tablets
        },
      },
      {
        breakpoint: 1024, // Desktop breakpoint
        settings: {
          slidesToShow: 1, // Number of slides to show on desktops
          slidesToScroll: 1, // Number of slides to scroll on desktops
          autoplay: true,
          prevArrow: false,
          nextArrow: false,
          dots: false, // Enable dots on desktops
          arrows: false, // Enable arrows on desktops
        },
      },
      {
        breakpoint: 1200, // Desktop breakpoint
        settings: {
          slidesToShow: 1, // Number of slides to show on desktops
          slidesToScroll: 1, // Number of slides to scroll on desktops
          autoplay: true,
          prevArrow: false,
          nextArrow: false,
          dots: false, // Enable dots on desktops
          arrows: false, // Enable arrows on desktops
        },
      },
    ],
  };
}
