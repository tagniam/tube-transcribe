import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'speed-control',
  templateUrl: './speed-control.component.html',
  styleUrls: ['./speed-control.component.css']
})
export class SpeedControlComponent implements OnInit {
  @ViewChild('playbackRate') playbackInput: ElementRef;

  @Input() set playbackRates(rates: Array<number>) {
    this.rates = rates;
    this.playbackInput.nativeElement.max = rates.length;
    this.playbackInput.nativeElement.value = rates.indexOf(1) + 1;
  }

  private rates: Array<number> = [1];
  @Output() playbackRateChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  /**
   * Emit an event specifying the new playback rate.
   * @param pos new playback rate position in rates array
   */
  changePlaybackRate(pos) {
    this.playbackRateChange.emit(this.rates[pos-1]);
  }

}
