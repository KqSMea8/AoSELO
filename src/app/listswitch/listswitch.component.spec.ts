import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListswitchComponent } from './listswitch.component';

describe('ListswitchComponent', () => {
  let component: ListswitchComponent;
  let fixture: ComponentFixture<ListswitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListswitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListswitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
