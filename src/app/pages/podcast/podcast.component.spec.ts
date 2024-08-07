import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastComponent } from './podcast.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PodcastComponent', () => {
  let component: PodcastComponent;
  let fixture: ComponentFixture<PodcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PodcastComponent, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PodcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
