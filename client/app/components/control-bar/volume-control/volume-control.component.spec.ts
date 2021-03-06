import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeControlComponent } from './volume-control.component';

describe('VolumeControlComponent', () => {
  let component: VolumeControlComponent;
  let fixture: ComponentFixture<VolumeControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
