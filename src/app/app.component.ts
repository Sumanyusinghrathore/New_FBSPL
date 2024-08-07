import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterOutlet,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { FooterModule } from './components/footer/footer.module';
import { LoaderService } from './services/loader/loader.service';
import { LoaderComponent } from './components/loader/loader.component';
import { AOSService } from './services/AOSanimation/aos.service';
import { HeaderComponent } from './components/header/header.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    HeaderComponent,
    FooterModule,
    LoaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private routerSubscription: Subscription | undefined;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object,
    private loaderService: LoaderService,
    private router: Router,
    private aosService: AOSService
  ) {}

  ngOnInit(): void {
    this.loaderService.show();

    if (isPlatformBrowser(this.platformId)) {
      this.aosService.init();
      let prevScrollPos = window.pageYOffset;

      window.onscroll = () => {
        const currentScrollPos = window.pageYOffset;
        this.handleScroll(currentScrollPos, prevScrollPos);
        this.subHandleScroll(currentScrollPos, prevScrollPos);
        prevScrollPos = currentScrollPos;
      };

      const navMain = this.document.getElementById('navbarCollapse');
      if (navMain) {
        navMain.onclick = () => {
          if (navMain.classList.contains('show')) {
            navMain.classList.remove('show');
          }
        };
      }
      const subNavMain = this.document.getElementById('subNavbarCollapse');
      if (subNavMain) {
        subNavMain.onclick = () => {
          if (subNavMain.classList.contains('show')) {
            subNavMain.classList.remove('show');
          }
        };
      }

      window.addEventListener('load', this.onWindowLoad);
    }

    this.routerSubscription = this.router.events.subscribe((event) => {
      console.clear();
      if (event instanceof NavigationStart) {
        this.loaderService.show();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.checkResourcesLoaded();
      }
    });
    // this.hideGlobalLoader();
  }

  subHandleScroll(currentScrollPos: number, prevScrollPos: number): void {
    const navMain = this.document.getElementById('subNavbarCollapse');
    const homeNav = this.document.getElementById('homeNav');
    const blogAside = this.document.getElementById('blog-aside');

    if (navMain) {
      if (currentScrollPos > 10) {
        // Adjust '10' based on desired scroll threshold
        navMain.classList.add('scrolled');
      } else {
        navMain.classList.remove('scrolled');
      }

      if (currentScrollPos > prevScrollPos && currentScrollPos > 5) {
        // Scroll down - hide navbar
        navMain.classList.add('hidden');
      } else if (prevScrollPos > currentScrollPos) {
        // Scroll up - show navbar
        navMain.classList.remove('hidden');
      }
      prevScrollPos = currentScrollPos;
    }

    if (homeNav || blogAside) {
      const elements = [homeNav, blogAside];
      elements.forEach((element) => {
        if (element) {
          if (prevScrollPos < currentScrollPos) {
            element.classList.remove('nav-visible');
          } else {
            element.classList.add('nav-visible');
          }
        }
      });
    }
  }

  handleScroll(currentScrollPos: number, prevScrollPos: number): void {
    const navMain = this.document.getElementById('navbarCollapse');
    const homeNav = this.document.getElementById('homeNav');
    const blogAside = this.document.getElementById('blog-aside');

    if (navMain) {
      if (currentScrollPos > 10) {
        // Adjust '10' based on desired scroll threshold
        navMain.classList.add('scrolled');
      } else {
        navMain.classList.remove('scrolled');
      }

      if (currentScrollPos > prevScrollPos && currentScrollPos > 5) {
        // Scroll down - hide navbar
        navMain.classList.add('hidden');
      } else if (prevScrollPos > currentScrollPos) {
        // Scroll up - show navbar
        navMain.classList.remove('hidden');
      }
      prevScrollPos = currentScrollPos;
    }

    if (homeNav || blogAside) {
      const elements = [homeNav, blogAside];
      elements.forEach((element) => {
        if (element) {
          if (prevScrollPos < currentScrollPos) {
            element.classList.remove('nav-visible');
          } else {
            element.classList.add('nav-visible');
          }
        }
      });
    }
  }

  checkResourcesLoaded(): void {
    if (
      isPlatformBrowser(this.platformId) &&
      document.readyState === 'complete'
    ) {
      this.loaderService.hide();
      this.hideGlobalLoader();
    }
  }

  onWindowLoad = (): void => {
    if (isPlatformBrowser(this.platformId)) {
      this.hideGlobalLoader();
      this.loaderService.hide();
    }
  };

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('load', this.onWindowLoad);
    }
  }

  hideGlobalLoader(): void {
    const globalLoader = this.document.getElementById('globalLoader');
    if (globalLoader) {
      globalLoader.classList.add('hidden');
    }
  }
}
