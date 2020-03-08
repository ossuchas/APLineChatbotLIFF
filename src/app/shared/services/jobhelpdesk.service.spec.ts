import { TestBed } from '@angular/core/testing';

import { JobhelpdeskService } from './jobhelpdesk.service';

describe('JobhelpdeskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobhelpdeskService = TestBed.get(JobhelpdeskService);
    expect(service).toBeTruthy();
  });
});
