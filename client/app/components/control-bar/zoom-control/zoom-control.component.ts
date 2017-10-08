import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'zoom-control',
  templateUrl: './zoom-control.component.html',
  styleUrls: ['./zoom-control.component.css']
})
export class ZoomControlComponent implements OnInit {
  @Output() zoomChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  /**
   * Sets the zoom level of the timeline.
   * @param zoom new zoom level, between 0 and 100
   */
  changeZoom(zoomLevel) {
    this.zoomChange.emit(zoomLevel);
  }}
