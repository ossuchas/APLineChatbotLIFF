import { TestBed } from '@angular/core/testing';

import { LiffappService } from './liffapp.service';

describe('LiffappService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LiffappService = TestBed.get(LiffappService);
    expect(service).toBeTruthy();
  });
});
