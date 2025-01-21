import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorVailabilityComponent } from './doctor-vailability.component';

describe('DoctorVailabilityComponent', () => {
  let component: DoctorVailabilityComponent;
  let fixture: ComponentFixture<DoctorVailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorVailabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorVailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
