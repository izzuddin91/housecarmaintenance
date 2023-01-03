import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarMainComponent } from './car-main.component';

describe('CarMainComponent', () => {
  let component: CarMainComponent;
  let fixture: ComponentFixture<CarMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
