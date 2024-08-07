import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JdComponent } from './jd.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('JdComponent', () => {
  let component: JdComponent;
  let fixture: ComponentFixture<JdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JdComponent, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(JdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
