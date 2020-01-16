import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadlagByroleprojectComponent } from './leadlag-byroleproject.component';

describe('LeadlagByroleprojectComponent', () => {
  let component: LeadlagByroleprojectComponent;
  let fixture: ComponentFixture<LeadlagByroleprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadlagByroleprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadlagByroleprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
