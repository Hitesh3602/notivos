import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XStateComponent } from './x-state.component';

describe('XStateComponent', () => {
  let component: XStateComponent;
  let fixture: ComponentFixture<XStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
