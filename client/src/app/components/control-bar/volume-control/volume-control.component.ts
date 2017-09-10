import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'volume-control',
  templateUrl: './volume-control.component.html',
  styleUrls: ['./volume-control.component.css']
})
export class VolumeControlComponent implements OnInit {
  @Output() volumeChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  /**
   * Sets the volume of the player.
   * @param volume new volume
   */
  changeVolume(volume) {
    this.volumeChange.emit(volume);
  }
}
