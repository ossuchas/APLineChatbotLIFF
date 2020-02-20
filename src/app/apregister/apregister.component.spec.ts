import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApregisterComponent } from './apregister.component';

describe('ApregisterComponent', () => {
  let component: ApregisterComponent;
  let fixture: ComponentFixture<ApregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
