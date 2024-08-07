import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralLedgerAccountingComponent } from './general-ledger-accounting.component';

describe('GeneralLedgerAccountingComponent', () => {
  let component: GeneralLedgerAccountingComponent;
  let fixture: ComponentFixture<GeneralLedgerAccountingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralLedgerAccountingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralLedgerAccountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
