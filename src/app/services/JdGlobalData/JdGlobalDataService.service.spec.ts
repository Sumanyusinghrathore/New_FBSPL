import { TestBed } from '@angular/core/testing';

import { JdGlobalDataService } from './JdGlobalDataService.service';

describe('JdGlobalDataService', () => {
  let service: JdGlobalDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JdGlobalDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
