import { TestBed } from '@angular/core/testing';

import { UserSubjectService } from './user-subject.service';

describe('UserSubjectService', () => {
  let service: UserSubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
