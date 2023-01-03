import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarPartsComponent } from './edit-car-parts.component';

describe('EditCarPartsComponent', () => {
  let component: EditCarPartsComponent;
  let fixture: ComponentFixture<EditCarPartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCarPartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCarPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
