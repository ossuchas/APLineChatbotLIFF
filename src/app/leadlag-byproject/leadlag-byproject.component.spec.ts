import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadlagByprojectComponent } from './leadlag-byproject.component';

describe('LeadlagByprojectComponent', () => {
  let component: LeadlagByprojectComponent;
  let fixture: ComponentFixture<LeadlagByprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadlagByprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadlagByprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
