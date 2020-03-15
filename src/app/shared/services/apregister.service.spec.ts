import { TestBed } from '@angular/core/testing';

import { ApregisterService } from './apregister.service';

describe('ApregisterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApregisterService = TestBed.get(ApregisterService);
    expect(service).toBeTruthy();
  });
});
