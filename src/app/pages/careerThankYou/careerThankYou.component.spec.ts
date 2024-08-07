import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerThankyouComponent } from './careerThankYou.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CareerThankyouComponent', () => {
  let component: CareerThankyouComponent;
  let fixture: ComponentFixture<CareerThankyouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareerThankyouComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CareerThankyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
