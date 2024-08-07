import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerFormComponent } from './career-form.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CareerFormComponent', () => {
  let component: CareerFormComponent;
  let fixture: ComponentFixture<CareerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareerFormComponent, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CareerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
