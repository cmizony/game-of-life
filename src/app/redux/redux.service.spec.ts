import { TestBed, inject } from '@angular/core/testing';

import { ReduxService } from './redux.service';

describe('ReduxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReduxService]
    });
  });

  it('should ...', inject([ReduxService], (service: ReduxService) => {
    expect(service).toBeTruthy();
  }));
});
