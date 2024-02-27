import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedUsersDialogComponent } from './shared-users-dialog.component';

describe('SharedUsersDialogComponent', () => {
  let component: SharedUsersDialogComponent;
  let fixture: ComponentFixture<SharedUsersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedUsersDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedUsersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
