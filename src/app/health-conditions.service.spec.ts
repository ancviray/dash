import { TestBed } from '@angular/core/testing';

import { HealthConditionsService } from './health-conditions.service';

describe('HealthConditionsService', () => {
  let service: HealthConditionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthConditionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
