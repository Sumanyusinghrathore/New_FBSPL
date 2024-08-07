import { TestBed } from '@angular/core/testing';

import { subPodcastService } from './subPodcast.service';

describe('subPodcastService', () => {
  let service: subPodcastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(subPodcastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
