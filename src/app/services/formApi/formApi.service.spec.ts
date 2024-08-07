import { TestBed } from '@angular/core/testing';

import { FormApiService } from './formApi.service';

describe('FormApiService', () => {
  let service: FormApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
