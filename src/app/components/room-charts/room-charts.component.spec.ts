import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomChartsComponent } from './room-charts.component';

describe('RoomChartsComponent', () => {
  let component: RoomChartsComponent;
  let fixture: ComponentFixture<RoomChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
