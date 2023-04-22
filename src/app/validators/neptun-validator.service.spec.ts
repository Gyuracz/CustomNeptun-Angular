import { TestBed } from '@angular/core/testing';

import { NeptunValidatorService } from './neptun-validator.service';

describe('NeptunValidatorService', () => {
  let service: NeptunValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeptunValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
