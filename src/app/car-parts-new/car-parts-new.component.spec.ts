import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPartsNewComponent } from './car-parts-new.component';

describe('CarPartsNewComponent', () => {
  let component: CarPartsNewComponent;
  let fixture: ComponentFixture<CarPartsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarPartsNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarPartsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
