import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseLogsNewComponent } from './house-logs-new.component';

describe('HouseLogsNewComponent', () => {
  let component: HouseLogsNewComponent;
  let fixture: ComponentFixture<HouseLogsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseLogsNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseLogsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
