import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentOpeningComponent } from './currentOpening.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CurrentOpeningComponent', () => {
  let component: CurrentOpeningComponent;
  let fixture: ComponentFixture<CurrentOpeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentOpeningComponent, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CurrentOpeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
