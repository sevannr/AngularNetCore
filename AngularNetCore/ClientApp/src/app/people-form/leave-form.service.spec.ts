import { TestBed } from '@angular/core/testing';

import { LeaveFormService } from './leave-form.service';

describe('LeaveFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeaveFormService = TestBed.get(LeaveFormService);
    expect(service).toBeTruthy();
  });
});
