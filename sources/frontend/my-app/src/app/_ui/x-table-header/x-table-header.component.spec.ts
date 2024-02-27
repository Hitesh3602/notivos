import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XTableHeaderComponent } from './x-table-header.component';

describe('TableHeaderComponent', () => {
  let component: XTableHeaderComponent;
  let fixture: ComponentFixture<XTableHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XTableHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XTableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
