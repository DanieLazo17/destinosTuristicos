import { TestBed } from '@angular/core/testing';

import { ValidadorGuard } from './validador.guard';

describe('ValidadorGuard', () => {
  let guard: ValidadorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidadorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
