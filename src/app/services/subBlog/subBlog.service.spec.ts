import { TestBed } from '@angular/core/testing';

import { SubBlogService } from './subBlog.service';

describe('SubBlogService', () => {
  let service: SubBlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubBlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
