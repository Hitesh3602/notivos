import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XNoteTabComponent } from './x-note-tab.component';

describe('XNoteTabComponent', () => {
  let component: XNoteTabComponent;
  let fixture: ComponentFixture<XNoteTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XNoteTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XNoteTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
