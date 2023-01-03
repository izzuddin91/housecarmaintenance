import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseLogsComponent } from './house-logs.component';

describe('HouseLogsComponent', () => {
  let component: HouseLogsComponent;
  let fixture: ComponentFixture<HouseLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseLogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
