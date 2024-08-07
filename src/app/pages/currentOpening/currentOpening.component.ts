import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../services/seo/seo.service';
import { SeoData } from '../../services/seo/seo-data.model';
import { currentOpeningService } from '../../services/currentOpening/currentOpening.service';
import { CdnUrlDirective } from '../../directives/cdn-url.directive';
@Component({
  selector: 'app-currentOpening',
  standalone: true,
  imports: [CommonModule, RouterLink, CdnUrlDirective],
  templateUrl: './currentOpening.component.html',
  styleUrl: './currentOpening.component.css',
})
export class CurrentOpeningComponent implements OnInit {
  openings: any = [];

  constructor(
    private seoService: SeoService,
    private currentOpeningService: currentOpeningService
  ) {}

  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'Career Opportunities and Job Openings | Join the FBSPL Team',
      description:
        'Check out our current job openings and apply for the suitable position for your career growth. Join our dynamic workplace -FBSPL team.',
      keywords: 'job openings',
      ogImage: '/Current-oppning/CurrentOpp.Banner.jpg',
    };
    this.seoService.setMetaTags(seoData);

    this.loadOpenings();
  }
  loadOpenings(): void {
    this.currentOpeningService.getcurrentOpeningData().subscribe(
      (data) => {
        this.openings = data.data;
      },
      (error) => {
        console.error('Error fetching current-opening data', error);
      }
    );
  }
}
