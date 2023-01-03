import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseTasksNewComponent } from './house-tasks-new.component';

describe('HouseTasksNewComponent', () => {
  let component: HouseTasksNewComponent;
  let fixture: ComponentFixture<HouseTasksNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseTasksNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseTasksNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
