import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalCheckupComponent } from './medical-checkup.component';

describe('MedicalCheckupComponent', () => {
  let component: MedicalCheckupComponent;
  let fixture: ComponentFixture<MedicalCheckupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicalCheckupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalCheckupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
