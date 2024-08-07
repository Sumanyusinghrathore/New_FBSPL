import { ComponentFixture, TestBed } from '@angular/core/testing';

import { claimManagement } from './claim-management.component';

describe('claimManagement', () => {
  let component: claimManagement;
  let fixture: ComponentFixture<claimManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [claimManagement]
    })
      .compileComponents();

    fixture = TestBed.createComponent(claimManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
