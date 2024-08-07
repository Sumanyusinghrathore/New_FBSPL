import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { CommonModule } from '@angular/common';
import { SeoService } from '../../../services/seo/seo.service';
import { SeoData } from '../../../services/seo/seo-data.model';
import { FaqComponent } from '../../../components/HomeComponents/faq/faq.component';
import { ServiceVimeoComponent } from '../../../components/HomeComponents/service-vimeo/service-vimeo.component';
import { ServiceCaseStudyComponent } from '../../../components/HomeComponents/service-case-study/service-case-study.component';
import { KnowBestComponent } from '../../../components/HomeComponents/know-best/know-best.component';
import { CdnUrlDirective } from '../../../directives/cdn-url.directive';
import { environment } from '../../../../environments/environment';
import { ourAssetsComponent } from '../../../components/HomeComponents/ourAssets/ourAssets.component';
@Component({
  selector: 'app-service-rpo',
  standalone: true,
  templateUrl: './service-rpo.component.html',
  styleUrl: './service-rpo.component.css',
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    SlickCarouselModule,
    FaqComponent,
    ServiceVimeoComponent,
    ServiceCaseStudyComponent,
    KnowBestComponent,
    CdnUrlDirective,
    ourAssetsComponent,
  ],
})
export class ServiceRPOComponent implements OnInit {
  cdnUrl = environment.cdnUrl;
  constructor(private seoService: SeoService) {}
  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'Recruitment Process Outsourcing (RPO) Solutions | FBSPL',
      description:
        'We provide recruitment & staffing (rpo) solutions to top industries to save time, money and find the right candidates. Contact us today.',
      keywords:
        'Recruitment process outsourcing, RPO services,Recruitment solutions',
      ogImage: '/ogImage/RPO Banner 1.jpg',
    };
    this.seoService.setMetaTags(seoData);
  }
  slides = [
    {
      banner: true,
      img: `${this.cdnUrl}assets/RPO/Main Banner/RPO Banner.webp`,
      img_mob: `${this.cdnUrl}assets/RPO/Main Banner/RPO Banner Mobile 01.webp`,
      Title: 'Fast-Paced Recruitment Process Outsourcing Services  ',
      Description:
        'Hasten your hiring process with our advanced recruitment outsourcing services. Our RPO staffing professionals utilize the latest technologies to hire the best talent while reducing your time to hire candidates. ',
      serviceRPO: 'Onboard Talent with Us ',
      Link: '/book-free-consultation-call',
      alt:'Recruitment Process Outsourcing (RPO) Services'
    },
    {
      banner: false,
      img: `${this.cdnUrl}assets/RPO/Main Banner/RPO Banner 02.webp`,
      img_mob: `${this.cdnUrl}assets/RPO/Main Banner/RPO Banner Mobile 02.webp`,
      Title: 'Case Study',
      Description:
        'Get a glimpse of the talent revolution of our clients with our result-oriented RPO services. Watch the transformative impact we have made on organizations and their recruitment strategies. ',
      serviceRPO: 'Onboard Talent with Us ',
      Link: '/case-studies#recruitment',
      alt:'FBSPL RPO Case Study'
    },
    {
      banner: false,
      img: `${this.cdnUrl}assets/RPO/Main Banner/RPO Main Banner 3.webp`,
      img_mob: `${this.cdnUrl}assets/RPO/Main Banner/RPO Banner Mobile 03.webp`,
      Title: 'Know What’s Trending in RPO ',
      Description:
        'Stay at the forefront of talent acquisition! Explore the recruitment process outsourcing trends, market insights, best practices for talent acquisition, RPO solutions, and more. ',
      serviceRPO: 'Onboard Talent with Us ',
      Link: '/blogs#recruitment',
      alt:'RPO Blogs & Latest Trends'
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
