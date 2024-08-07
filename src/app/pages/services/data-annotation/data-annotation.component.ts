import { Component, OnInit } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../../services/seo/seo.service';
import { SeoData } from '../../../services/seo/seo-data.model';
import { FaqComponent } from '../../../components/HomeComponents/faq/faq.component';
import { ServiceCaseStudyComponent } from '../../../components/HomeComponents/service-case-study/service-case-study.component';
import { CdnUrlDirective } from '../../../directives/cdn-url.directive';
import { environment } from '../../../../environments/environment';
import { KnowBestComponent } from '../../../components/HomeComponents/know-best/know-best.component';
import { ourAssetsComponent } from "../../../components/HomeComponents/ourAssets/ourAssets.component";
@Component({
  selector: 'app-data-annotation',
  standalone: true,
  templateUrl: './data-annotation.component.html',
  styleUrl: './data-annotation.component.css',
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    SlickCarouselModule,
    FaqComponent,
    ServiceCaseStudyComponent,
    CdnUrlDirective,
    KnowBestComponent,
    ourAssetsComponent
],
})
export class DataAnnotationComponent implements OnInit {
  cdnUrl = environment.cdnUrl;
  constructor(private seoService: SeoService) {}
  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'AI Data Annotation & Labeling Outsourcing Services',
      description:
        'FBSPL offers high-quality data annotation outsourcing services for machine learning, ai, finance & insurance industries to improve their data and business model.',
      keywords: 'data annotation services, labeling services',
      ogImage: '/Data Annotation/Data Annotation Banner 1.jpg',
    };
    this.seoService.setMetaTags(seoData);
  }
  slides = [
    {
      banner: true,
      img: `${this.cdnUrl}assets/Data Annotation/Data Annotation Banner 1.jpg`,
      img_mob: `${this.cdnUrl}assets/Data Annotation/Data Annotation Mobile 1.jpg`,
      Title: 'Data Annotation Solution – Being Responsibly Advanced ',
      Description:
        'We bring the future of data annotation to you. Following established guidelines and annotation standards, our data annotation services are accurate and known to achieve meaningful results. Right from speech and video datasets to object detection and sentiment analysis, you can trust our experts with any dataset and annotation. ',
      Dataannotation: 'Click to advance',
      Link: '/book-free-consultation-call',
      alt:'Data Annotation & Labelling Services '
    },
    {
      banner: false,
      img: `${this.cdnUrl}assets/Data Annotation/Data Annotation Banner 2.jpg`,
      img_mob: `${this.cdnUrl}assets/Data Annotation/Data Annotation Mobile 2.jpg`,
      Title:
        'How Did Our Data Annotation Services Increase the Number of Customers for a Client?',
      Description:
        'The partnership enhanced invoice processing efficiency, increased visibility and controls, and lowered operational costs. ',
      Link: '/case-studies#dataAnnotation',
      alt:'Data Annotation Case Study '
    },
    {
      banner: false,
      img: `${this.cdnUrl}assets/Data Annotation/Data Annotation Banner 3.jpg`,
      img_mob: `${this.cdnUrl}assets/Data Annotation/Data Annotation Mobile 3.jpg`,
      Title:
        'Basic & Comprehensive Guide to Data Annotation and Labelling in Machine Learning & Artificial Intelligence ',
      Description:
        'Read our blog to know what data annotation and labeling is, how it is done, types of data annotation, their use cases, and more. ',
      Link: '/blogs#dataAnnotation',
      alt:' Data Annotation Blogs & Latest Trends'
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
