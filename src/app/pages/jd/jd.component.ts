import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';

import { SeoService } from '../../services/seo/seo.service';
import { SeoData } from '../../services/seo/seo-data.model';
import { JdService } from '../../services/jd/jd.service';
import { JdGlobalDataService } from '../../services/JdGlobalData/JdGlobalDataService.service';
import { CdnUrlDirective } from '../../directives/cdn-url.directive';

@Component({
  selector: 'app-jd',
  standalone: true,
  imports: [CommonModule, RouterLink, CdnUrlDirective],
  templateUrl: './jd.component.html',
  styleUrl: './jd.component.css',
})
export class JdComponent implements OnInit {
  jdData: any = {};
  positionName = '';
  constructor(
    private seoService: SeoService,
    private route: ActivatedRoute,
    private Jdservice: JdService,
    private router: Router,
    private dataService: JdGlobalDataService
  ) {}

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        this.loadJd(fragment);
      } else {
        this.router.navigate(['/careers']);
      }
    });
  }

  setSeo(): void {
    const seoData: SeoData = {
      title: `${this.positionName} at FBSPL - Join Our Team`,
      description: `Apply now for the ${this.positionName} position at FBSPL. We're Great Place to Work-certified and offer great opportunities for growth and development. Apply today!`,
      keywords: 'FBSPL, Great Place to Work, job opening',
    };
    this.seoService.setMetaTags(seoData);
  }

  loadJd(jobRole: string): void {
    this.Jdservice.getJdData(jobRole).subscribe(
      (data) => {
        this.jdData = data.data;
        this.positionName = this.jdData.position_name;
        const departmentName = this.jdData.department_name;
        const jdLink = this.jdData.jd_data;
        this.dataService.setData(this.positionName, departmentName, jdLink);
        this.setSeo();
      },
      (error) => {
        this.router.navigate(['/careers']);
        console.error('Error fetching jd', error);
      }
    );
  }

  hasApiData(): boolean {
    return this.jdData && Object.keys(this.jdData).length > 0;
  }
}
