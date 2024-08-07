import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SeoService } from '../../../services/seo/seo.service';
import { SeoData } from '../../../services/seo/seo-data.model';
import { FaqComponent } from '../../../components/HomeComponents/faq/faq.component';
import { KnowBestComponent } from '../../../components/HomeComponents/know-best/know-best.component';
import { ServiceVimeoComponent } from '../../../components/HomeComponents/service-vimeo/service-vimeo.component';
import { ServiceCaseStudyComponent } from '../../../components/HomeComponents/service-case-study/service-case-study.component';
import { CdnUrlDirective } from '../../../directives/cdn-url.directive';
import { environment } from '../../../../environments/environment';
import { ourAssetsComponent } from "../../../components/HomeComponents/ourAssets/ourAssets.component";

@Component({
  selector: 'app-accounting-bookkeeping',
  standalone: true,
  templateUrl: './accounting-bookkeeping.component.html',
  styleUrl: './accounting-bookkeeping.component.css',
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    SlickCarouselModule,
    FaqComponent,
    KnowBestComponent,
    ServiceVimeoComponent,
    ServiceCaseStudyComponent,
    CdnUrlDirective,
    ourAssetsComponent
],
})
export class AccountingBookkeepingComponent implements OnInit, AfterViewInit {
  cdnUrl = environment.cdnUrl;
  constructor(private seoService: SeoService) {}
  ngOnInit(): void {
    const seoData: SeoData = {
      title:
        'Outsourcing Accounting & Bookkeeping Services in USA, Canada & Beyond | FBSPL',
      description:
        'Partner with industry experts for outsourcing accounting & bookkeeping services in the US, Canada & worldwide. Trusted by CPAs, firms, and consultants for premier solutions. Contact FBSPL now.',
      keywords: 'accounting and bookkeeping outsourcing, financial operations',
      ogImage:
        'assets/Accounting Main Page/Slider Image/Accounting_Slider_Image_01.jpg',
    };
    this.seoService.setMetaTags(seoData);
  }

  ngAfterViewInit() {}

  slides = [
    {
      banner: true,
      img: `${this.cdnUrl}assets/Accounting Main Page/Slider Image/Accounting_Slider_Image_01.jpg`,
      img_mob: `${this.cdnUrl}assets/Accounting Main Page/Slider Image/Accounting_Slider_Image_Mob_01.jpg`,
      Title: 'Accounting & Bookkeeping Outsourcing Services ',
      Description:
        'Boost your financial performance beyond numbers! Achieve business accuracy with our accounting and bookkeeping services. From accounts payable and receivable to reconciliation, keep your books of accounts updated. ',
      accounting: 'Manage Your Books Seamlessly',
      Link: '/book-free-consultation-call',
      alt:'FBSPL Accounting & Bookkeeping Outsourcing Services'
    },
    {
      banner: false,
      img: `${this.cdnUrl}assets/Accounting Main Page/Slider Image/Accounting_Slider_Image_02.jpg`,
      img_mob: `${this.cdnUrl}assets/Accounting Main Page/Slider Image/Accounting_Slider_Image_Mob_02.jpg`,
      Title: 'Case Study',
      Description:
        'Explore how our outsourcing accounting and bookkeeping services have helped businesses bounce back stronger while attaining precision and accuracy. ',

      accounting: 'Manage Your Books Seamlessly',
      Link: '/case-studies#accountingandbookkeeping',
      alt:'FBSPL Accounting & Bookkeeping BPO Case Study '
    },
    {
      banner: false,
      img: `${this.cdnUrl}assets/Accounting Main Page/Slider Image/Accounting_Slider_Image_03.jpg`,
      img_mob: `${this.cdnUrl}assets/Accounting Main Page/Slider Image/Accounting_Slider_Image_Mob_03.jpg`,
      Title: 'Blogs',
      Description:
        'Keep an eye on what’s trending in accounting and bookkeeping. know more about the latest accounting trends, expert advice, and bookkeeping tips to manage your finances like a pro.  ',
      accounting: 'Manage Your Books Seamlessly',
      Link: '/blogs#accountingandbookkeeping',
      alt:'FBSPL Accounting & Bookkeeping Blog & Latest Trends'
    },
  ];
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    arrows: false,
    prevArrow: false,
    nextArrow: false,
    responsive: [
      {
        breakpoint: 768, // Tablet breakpoint
        settings: {
          slidesToShow: 1, // Number of slides to show on tablets
          slidesToScroll: 1, // Number of slides to scroll on tablets
          autoplay: true,
          autoplaySpeed: 3000,
          dots: false, // Enable dots on tablets
          arrows: false, // Disable arrows on tablets
          prevArrow: false,
          nextArrow: false,
        },
      },
      {
        breakpoint: 1024, // Desktop breakpoint
        settings: {
          slidesToShow: 1, // Number of slides to show on desktops
          slidesToScroll: 1, // Number of slides to scroll on desktops
          autoplay: true,
          autoplaySpeed: 3000,
          dots: false, // Enable dots on desktops
          arrows: false, // Disable arrows on desktops
          prevArrow: false,
          nextArrow: false,
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
