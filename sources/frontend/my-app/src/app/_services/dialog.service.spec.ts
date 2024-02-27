import { TestBed } from '@angular/core/testing';

import { AppDialogService } from './dialog.service';

describe('DialogService', () => {
  let service: AppDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
