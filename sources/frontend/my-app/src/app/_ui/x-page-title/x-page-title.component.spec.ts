import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XPageTitleComponent } from './x-page-title.component';

describe('XPageTitleComponent', () => {
  let component: XPageTitleComponent;
  let fixture: ComponentFixture<XPageTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XPageTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XPageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
