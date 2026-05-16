import { TestBed } from '@angular/core/testing';

import { Episodes } from './episodes';

describe('Episodes', () => {
  let service: Episodes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Episodes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
