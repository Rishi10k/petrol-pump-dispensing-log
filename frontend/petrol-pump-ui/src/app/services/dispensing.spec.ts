import { TestBed } from '@angular/core/testing';

import { Dispensing } from './dispensing';

describe('Dispensing', () => {
  let service: Dispensing;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dispensing);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
