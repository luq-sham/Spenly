import { TestBed } from '@angular/core/testing';

import { ValidationServices } from './validation-services';

describe('ValidationServices', () => {
  let service: ValidationServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
