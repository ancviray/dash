import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalAssessmentsComponent } from './medical-assessments.component';

describe('MedicalAssessmentsComponent', () => {
  let component: MedicalAssessmentsComponent;
  let fixture: ComponentFixture<MedicalAssessmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicalAssessmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalAssessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
