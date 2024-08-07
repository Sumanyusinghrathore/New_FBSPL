import { Component, HostListener, OnInit,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VimeoPlayerComponent } from '../vimeo-player/vimeo-player.component';
import { CommonModule,isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';
import {
  RouterLink,
  RouterOutlet,
  Router,
  NavigationEnd,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import {
  retryWhen,
  scan,
  delayWhen,
  timer,
  catchError,
  throwError,
} from 'rxjs';
import { CdnUrlDirective } from '../../directives/cdn-url.directive';
import { HeaderModalComponent } from '../header-modal/header-modal.component';
import { PLATFORM_ID } from '@angular/core';

declare var bootstrap: any;
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    VimeoPlayerComponent,
    CommonModule,
    RouterLink,
    RouterOutlet,
    CdnUrlDirective,
    RouterModule,
    HeaderModalComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menu: any;
  isActive: boolean = false;
  private apiUrl = environment.apiUrl;
  menuOpen: string | null = null;
  activeTab = 'tab1';
  menuData: any = null;
  blogs: any[] = [];
  podcasts: any[] = [];
  casestudy: any[] = [];
  private collapses: Record<string, boolean> = {};
  menuStates: { [key: string]: boolean } = {};
  activeLink!: string;
  isCustomerSupportActive: boolean = false;
  videos = [
    {
      videoUrl: 'https://player.vimeo.com/video/962238538',
      thumbnail:
        `${environment.cdnUrl}assets/Testimonials/client-testimonial/Client Testimonials YT 07 Stacey DiSpigno copy.webp`,
    },
    {
      videoUrl: 'https://player.vimeo.com/video/963295022',
      thumbnail:
        `${environment.cdnUrl}assets/Testimonials/client-testimonial/Client Testimonials YT 03 Joey Cumley.webp`,
    },
    {
      videoUrl: 'https://player.vimeo.com/video/969702390',
      thumbnail:
      `${environment.cdnUrl}assets/Testimonials/client-testimonial/Client Testimonials YT 01 Chin Ma.webp`
        ,
    },
  ];
  activatedRoute: any;

  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: object) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.closeMenuAndCollapses();
      });
  }

  closeMenuAndCollapses(): void {
    this.menuOpen = null;
    this.collapses = {};
  }

  ngOnInit() {
    this.fetchMenuData();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeLink = this.activeLink;
        this.menuOpen = null;
      }
    });
    this.router.events.subscribe(() => {
    });
  }

  fetchMenuData() { 
    if (isPlatformBrowser(this.platformId)){
      this.http
      .get(`${this.apiUrl}/api/menu/data`)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            scan((retryCount, error) => {
              if (retryCount >= 5 || error.status !== 429) {
                throw error;
              }
              retryCount++;
              return retryCount;
            }, 0),
            delayWhen((retryCount) => timer(retryCount * 1000)) // Exponential backoff
          )
        ),
        catchError((error) => {
          console.error('Error fetching menu data', error);
          return throwError(error);
        })
      )
      .subscribe(
        (data: any) => {
          const sanitizedData = this.sanitizeJsonResponse(data);
          if (this.isValidJson(sanitizedData)) {
            this.blogs = sanitizedData.blogs || [];
            this.podcasts = sanitizedData.podcasts || [];
            this.casestudy = sanitizedData.casestudy || [];
          } else {
            console.error('Invalid JSON response', sanitizedData);
          }
        },
        (error) => {
          console.error('Error fetching menu data', error);
        }
      );
    } 
  }

  sanitizeJsonResponse(response: any): any {
    try {
      return JSON.parse(JSON.stringify(response).replace(/[^\x20-\x7E]/g, ''));
    } catch (error) {
      console.error('Error sanitizing JSON response', error);
      return response;
    }
  }

  isValidJson(response: any): boolean {
    try {
      JSON.parse(JSON.stringify(response));
      return true;
    } catch (error) {
      return false;
    }
  }

  toggleCollapse(id: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.collapses[id] = !this.collapses[id];
  }

  isCollapsed(id: string): boolean {
    return this.collapses[id] || false;
  }

  toggleMenu(menuId: string) {
    this.menuOpen = this.menuOpen === menuId ? null : menuId;
  }

  openMenu(menu: string) {
    this.menuOpen = menu;
    if (['thinkingDropdown', 'Career', 'services', 'About'].includes(menu)) {
      this.activateTab('tab1');
    }
  }

  closeMenu(menu: string) {
    if (this.menuOpen === menu) {
        this.menuOpen = null;
    }
  }

  activateTab(tab: string): void {
    this.activeTab = tab;
  }

  showMenu(menu: string): void {
    this.openMenu(menu);
  }

  hideMenu(menu: string): void {
    if (this.menuOpen === menu) {
      this.menuOpen = null;
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!(event.target as HTMLElement).closest('.has-megamenu')) {
      this.menuOpen = null;
    }
  }

  toggleSubMenu(menu: string): void {
    this.menuStates[menu] = !this.menuStates[menu];
  }

  megamenu(menu: string): void {
    this.openMenu(menu);
  }

  ngAfterViewInit() {
    // Implement any initialization logic needed after the view is initialized
    if (this.router.url) {
    }
  }
  currentheaderUrl: string = '';

  openVideo(headerurl:string) {
    this.currentheaderUrl = headerurl;
    const modalElement = document.getElementById('headerModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}