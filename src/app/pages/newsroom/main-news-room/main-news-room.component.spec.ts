import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNewsRoomComponent } from './main-news-room.component';

describe('MainNewsRoomComponent', () => {
  let component: MainNewsRoomComponent;
  let fixture: ComponentFixture<MainNewsRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainNewsRoomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainNewsRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
