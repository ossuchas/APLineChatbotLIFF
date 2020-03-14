import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpdeskinquiryComponent } from './helpdeskinquiry.component';

describe('HelpdeskinquiryComponent', () => {
  let component: HelpdeskinquiryComponent;
  let fixture: ComponentFixture<HelpdeskinquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpdeskinquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpdeskinquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
