import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurLeaderComponent } from './our-leader.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('OurLeaderComponent', () => {
  let component: OurLeaderComponent;
  let fixture: ComponentFixture<OurLeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurLeaderComponent, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OurLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
