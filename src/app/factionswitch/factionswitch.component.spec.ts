import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactionswitchComponent } from './factionswitch.component';

describe('FactionswitchComponent', () => {
  let component: FactionswitchComponent;
  let fixture: ComponentFixture<FactionswitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactionswitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactionswitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
