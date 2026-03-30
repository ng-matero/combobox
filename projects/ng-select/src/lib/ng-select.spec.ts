import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSelect } from './ng-select';

describe('NgSelect', () => {
  let component: NgSelect;
  let fixture: ComponentFixture<NgSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(NgSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
