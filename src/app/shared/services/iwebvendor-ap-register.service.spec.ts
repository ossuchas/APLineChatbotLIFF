import { TestBed } from '@angular/core/testing';

import { IwebvendorApRegisterService } from './iwebvendor-ap-register.service';

describe('IwebvendorApRegisterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IwebvendorApRegisterService = TestBed.get(IwebvendorApRegisterService);
    expect(service).toBeTruthy();
  });
});
