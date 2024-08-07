import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeFbsplComponent } from './life-fbspl.component';

describe('LifeFbsplComponent', () => {
  let component: LifeFbsplComponent;
  let fixture: ComponentFixture<LifeFbsplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LifeFbsplComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LifeFbsplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
