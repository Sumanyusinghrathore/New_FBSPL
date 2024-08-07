import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

import { SeoService } from '../../services/seo/seo.service';
import { SeoData } from '../../services/seo/seo-data.model';
import { CdnUrlDirective } from '../../directives/cdn-url.directive';

@Component({
  selector: 'app-ourleader',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet,CdnUrlDirective],
  templateUrl: './our-leader.component.html',
  styleUrl: './our-leader.component.css',
})
export class OurLeaderComponent implements OnInit {
  constructor(private seoService: SeoService) {}
  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'FBSPL Leadership | Meet Our Leaders',
      description:
        'Meet the visionary leaders at FBSPL. Our team is committed to innovation, excellence, and guiding our company towards success in business process outsourcing and management.',
      keywords: 'our team, meet our leaders',
      ogImage: '/leaders/Banner/LeadershipBanner.png'
    };
    this.seoService.setMetaTags(seoData);
  }
}
