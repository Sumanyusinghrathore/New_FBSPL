import { TestBed } from '@angular/core/testing';
import { BaseUrlService } from './base-url.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

describe('BaseUrlService', () => {
  let service: BaseUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseUrlService,
        { provide: PLATFORM_ID, useValue: 'browser' } // Mocking as browser
      ]
    });
    service = TestBed.inject(BaseUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return base URL when in browser', () => {
    spyOnProperty(window, 'location').and.returnValue({
      origin: 'http://localhost:4200'
    } as Location);
    expect(service.getBaseUrl()).toBe('http://localhost:4200');
  });
});
