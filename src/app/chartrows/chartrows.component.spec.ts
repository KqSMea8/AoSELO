import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartrowsComponent } from './chartrows.component';

describe('ChartrowsComponent', () => {
  let component: ChartrowsComponent;
  let fixture: ComponentFixture<ChartrowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartrowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartrowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
