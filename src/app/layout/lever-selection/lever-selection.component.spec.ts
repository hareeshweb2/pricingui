import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeverSelectionComponent } from './lever-selection.component';

describe('LeverSelectionComponent', () => {
  let component: LeverSelectionComponent;
  let fixture: ComponentFixture<LeverSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeverSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeverSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
