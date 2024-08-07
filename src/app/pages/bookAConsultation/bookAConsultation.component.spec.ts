import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAConsultationComponent } from './bookAConsultation.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('BookAConsultationComponent', () => {
  let component: BookAConsultationComponent;
  let fixture: ComponentFixture<BookAConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookAConsultationComponent, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BookAConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
