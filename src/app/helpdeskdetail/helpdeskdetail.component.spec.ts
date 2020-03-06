import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpdeskdetailComponent } from './helpdeskdetail.component';

describe('HelpdeskdetailComponent', () => {
  let component: HelpdeskdetailComponent;
  let fixture: ComponentFixture<HelpdeskdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpdeskdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpdeskdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
