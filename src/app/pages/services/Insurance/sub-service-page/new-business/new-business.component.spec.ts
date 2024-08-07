import { ComponentFixture, TestBed } from '@angular/core/testing';

import { newBusinessComponent } from './new-business.component';

describe('newBusinessComponent', () => {
  let component: newBusinessComponent;
  let fixture: ComponentFixture<newBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [newBusinessComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(newBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
