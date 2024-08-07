import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSRComponent } from './csr.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CSRComponent', () => {
  let component: CSRComponent;
  let fixture: ComponentFixture<CSRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CSRComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CSRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
