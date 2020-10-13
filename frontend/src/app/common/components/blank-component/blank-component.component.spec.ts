import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankComponent } from "./BlankComponent";

describe('BlankComponentComponent', () => {
  let component: BlankComponent;
  let fixture: ComponentFixture<BlankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
