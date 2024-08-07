import { TestBed } from '@angular/core/testing';

import { careerFormService } from './careerForm.service';

describe('careerFormService', () => {
  let service: careerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(careerFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
