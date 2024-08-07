import { TestBed } from '@angular/core/testing';

import { SubNewsService } from './subNews.service';

describe('SubNewsService', () => {
  let service: SubNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
