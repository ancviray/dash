import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthCodeSetupComponent } from './health-code-setup.component';

describe('HealthCodeSetupComponent', () => {
  let component: HealthCodeSetupComponent;
  let fixture: ComponentFixture<HealthCodeSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HealthCodeSetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthCodeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
