import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSharedWithMeComponent } from './edit-shared-with-me.component';

describe('EditSharedWithMeComponent', () => {
  let component: EditSharedWithMeComponent;
  let fixture: ComponentFixture<EditSharedWithMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSharedWithMeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSharedWithMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
