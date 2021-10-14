import { TestBed } from '@angular/core/testing';

import { RolesUserGuard } from './roles-user.guard';

describe('RolesUserGuard', () => {
  let guard: RolesUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RolesUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
