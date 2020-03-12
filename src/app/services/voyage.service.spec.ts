import { TestBed } from '@angular/core/testing';

import { VoyageService } from './voyage.service';

describe('VoyageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VoyageService = TestBed.get(VoyageService);
    expect(service).toBeTruthy();
  });
});
