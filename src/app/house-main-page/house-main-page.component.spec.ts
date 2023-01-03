import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseMainPageComponent } from './house-main-page.component';

describe('HouseMainPageComponent', () => {
  let component: HouseMainPageComponent;
  let fixture: ComponentFixture<HouseMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
