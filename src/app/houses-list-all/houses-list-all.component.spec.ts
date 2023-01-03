import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousesListAllComponent } from './houses-list-all.component';

describe('HousesListAllComponent', () => {
  let component: HousesListAllComponent;
  let fixture: ComponentFixture<HousesListAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousesListAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousesListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
