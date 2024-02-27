import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSharedWithMeComponent } from './manage-shared-with-me.component';

describe('ManageSharedWithMeComponent', () => {
  let component: ManageSharedWithMeComponent;
  let fixture: ComponentFixture<ManageSharedWithMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSharedWithMeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSharedWithMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
