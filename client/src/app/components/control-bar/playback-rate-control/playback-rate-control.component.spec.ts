import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybackRateControlComponent } from './playback-rate-control.component';

describe('SpeedControlComponent', () => {
  let component: PlaybackRateControlComponent;
  let fixture: ComponentFixture<PlaybackRateControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybackRateControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybackRateControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
