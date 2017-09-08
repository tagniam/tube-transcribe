import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'time-display',
  templateUrl: './time-display.component.html',
  styleUrls: ['./time-display.component.css']
})

/**
 * Component to display the current video time in mm:ss:ms.
 */
export class TimeDisplayComponent implements OnInit {
  private time: String = '00:00:00';

  /**
   * Sets the time whenever the time changes.
   */
  @Input() set currentTime(value: number) {
    this.time = this.formatSecondsToMMSSMSString(value); 
  }
  
  constructor() { }

  ngOnInit() { }


  /**
   * Returns a string in the form of minutes:seconds:milliseconds
   * given a duration in seconds.
   * @param value the time to format in seconds
   */
  private formatSecondsToMMSSMSString(value: number): String {
    let ms = Math.floor((value*1000) % 1000).toString();
    let s = Math.floor(value%60).toString();
    let m = Math.floor((value*1000/(1000*60))%60).toString();

    if (s.length < 2) s = "0" + s;
    if (m.length < 2) m = "0" + m;
    if (ms.length < 2) ms = "0" + ms;

    return m + ":" + s + ":" + ms.slice(0, 2); 
  }

}
