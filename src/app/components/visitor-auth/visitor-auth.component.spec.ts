import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorAuthComponent } from './visitor-auth.component';

describe('VisitorAuthComponent', () => {
  let component: VisitorAuthComponent;
  let fixture: ComponentFixture<VisitorAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
