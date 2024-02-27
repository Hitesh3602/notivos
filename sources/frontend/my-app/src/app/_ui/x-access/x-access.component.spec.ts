import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XAccessComponent } from './x-access.component';

describe('XAccessComponent', () => {
  let component: XAccessComponent;
  let fixture: ComponentFixture<XAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XAccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
