import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlByprojectComponent } from './ll-byproject.component';

describe('LlByprojectComponent', () => {
  let component: LlByprojectComponent;
  let fixture: ComponentFixture<LlByprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlByprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlByprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
