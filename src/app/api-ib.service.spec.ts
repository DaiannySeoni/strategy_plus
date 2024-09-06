import { TestBed } from '@angular/core/testing';

import { ApiIBService } from './api-ib.service';

describe('ApiIBService', () => {
  let service: ApiIBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiIBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
