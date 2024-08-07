import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingBookkeepingComponent } from './accounting-bookkeeping.component';

describe('AccountingBookkeepingComponent', () => {
  let component: AccountingBookkeepingComponent;
  let fixture: ComponentFixture<AccountingBookkeepingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountingBookkeepingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountingBookkeepingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
