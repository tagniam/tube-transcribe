import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionBoxComponent } from './selection-box.component';

describe('SelectionBoxComponent', () => {
  let component: SelectionBoxComponent;
  let fixture: ComponentFixture<SelectionBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
