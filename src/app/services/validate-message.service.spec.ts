import { TestBed } from '@angular/core/testing';

import { ValidateMessageService } from './validate-message.service';

describe('ValidateMessageService', () => {
  let service: ValidateMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
