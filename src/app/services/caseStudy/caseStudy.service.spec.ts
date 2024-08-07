import { TestBed } from '@angular/core/testing';

import { caseStudyService } from './caseStudy.service';

describe('caseStudyService', () => {
  let service: caseStudyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(caseStudyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
