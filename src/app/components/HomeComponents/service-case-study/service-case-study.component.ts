import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface Blog {
  id: number;
  slug: string;
  title: string;
  category_id: number;
  feature_image: string;
  blog_category: any;
}

interface Podcast {
  megamenu_image: any;
  title: string;
  slug: string;
  episode_number: string;
  guest_image: string;
  vedio_url: string;
  main_page_title: string;
  main_page_banner: string;
}

interface CaseStudy {
  caseStudy_mobile_banner: any;
  id: number;
  slug: string;
  title: string;
  category_id: number;
  feature_image: string;
  case_study_category: any;
}

interface BlogResponse {
  blogs: Blog[];
  podcasts: Podcast[];
  caseStudy: CaseStudy[];
}

@Component({
  selector: 'app-service-case-study',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './service-case-study.component.html',
  styleUrls: ['./service-case-study.component.css'],
})
export class ServiceCaseStudyComponent implements OnInit {
  private apiUrl = environment.apiUrl;
  @Input() category: { category: string }[] = []; // Updated to accept an array of category objects
  blogs: Blog[] = [];
  podcasts: Podcast[] = [];
  caseStudies: CaseStudy[] = [];
  private apicaseUrl = `${this.apiUrl}/api/services/data?`;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBlogData();
    // this.buttonhideshow();
  }

  fetchBlogData(): void {
    const payload = {
      category: this.category,
    };

    this.http.post<BlogResponse>(this.apicaseUrl, payload).subscribe(
      (data) => {
        if (data) {
          // Handle blogs
          if (data.blogs && data.blogs.length > 0) {
            this.blogs = data.blogs;
          } else {
            this.blogs = []; // or handle no blogs case as per your application logic
          }

          // Handle podcasts
          if (data.podcasts && data.podcasts.length > 0) {
            this.podcasts = data.podcasts;
          } else {
            this.podcasts = [];
          }

          // Handle case studies
          if (data.caseStudy && data.caseStudy.length > 0) {
            this.caseStudies = data.caseStudy;
          } else {
            this.caseStudies = [];
          }
        } else {
          console.error('No data found in response');
          let thinking = document.getElementById('thinking');
          if (thinking) {
            thinking.style.display = 'none';
          }
        }
      },
      (error) => {
        console.error('Error fetching blog data:', error);
      }
    );
  }
}
