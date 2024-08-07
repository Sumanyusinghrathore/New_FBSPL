import { TestBed } from '@angular/core/testing';

import { currentOpeningService } from './currentOpening.service';

describe('currentOpeningService', () => {
  let service: currentOpeningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(currentOpeningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
