import { TestBed } from '@angular/core/testing';

import { IwebvendorVendorRegisterService } from './iwebvendor-vendor-register.service';

describe('IwebvendorVendorRegisterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IwebvendorVendorRegisterService = TestBed.get(IwebvendorVendorRegisterService);
    expect(service).toBeTruthy();
  });
});
