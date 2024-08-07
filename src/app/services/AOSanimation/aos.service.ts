import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as AOS from 'aos';

@Injectable({
  providedIn: 'root',
})
export class AOSService {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  init(): void {
    if (isPlatformBrowser(this.platformId)) {
      
      // Call refresh to ensure animations are calculated correctly on load
      setTimeout(() => {
        AOS.refresh();
         AOS.init({
        duration: 1200, // Animation duration in milliseconds
        easing: 'ease-in-out', // Easing function
        once: false, // Whether animation should happen only once
        mirror: true, // Whether elements should animate out while scrolling past them
      });
      }, 500);
    }
  }
}
