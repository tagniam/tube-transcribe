import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'media-controls',
  templateUrl: './media-controls.component.html',
  styleUrls: ['./media-controls.component.css']
})
export class MediaControlsComponent implements OnInit {
  // Changes play/pause button icon in case of external play/pause
  // (i.e. clicking the player screen/buffering).
  @Input() playing: boolean = false;
  @Output() playingChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  /**
   * Toggles play/pause and changes the button icons.
   */
  togglePlayPause(): void {
    this.playing = !this.playing;
    this.playingChange.emit(this.playing);
  }

}
