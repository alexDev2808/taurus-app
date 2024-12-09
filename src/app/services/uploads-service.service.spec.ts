import { TestBed } from '@angular/core/testing';

import { UploadsServiceService } from './upload.service';

describe('UploadsServiceService', () => {
  let service: UploadsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
