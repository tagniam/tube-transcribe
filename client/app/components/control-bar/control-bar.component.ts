import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { PlayerStates } from '../../enum/player-states.enum';

@Component({
  selector: 'control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.css']
})
export class ControlBarComponent implements OnInit, OnDestroy {
  private isPlaying: boolean;
  private currentTime: number = 0;
  private duration: number = 0;
  private playbackRates: Array<number> = [1];

  private playHeadPos: number = 0;
  private timelineWidth: number = screen.width;

  private timeIntervalId;

  // Constant for jumping forwards/backwards
  private readonly JUMP_SECONDS = 5;
  private readonly CHECK_MS = 10;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    // Subscribe to player state
    this.playerService.getPlayerState().subscribe((state) => {
      this.isPlaying = state == PlayerStates.PLAYING || state == PlayerStates.BUFFERING;
    });

    // Update current time
    this.timeIntervalId = setInterval(() => {
      if (this.isPlaying) {
        this.playerService.getCurrentTime().then(time => this.currentTime = time);
        this.playHeadPos = (this.currentTime / this.duration) * this.timelineWidth;
      }
    }, this.CHECK_MS);

    // Save duration of track
    this.playerService.getDuration().then(duration => this.duration = duration);

    // Save playback rates
    this.playerService.getAvailablePlaybackRates().then(rates => this.playbackRates = rates);
  }

  ngOnDestroy() {
    this.playerService.endLoop();
    clearInterval(this.timeIntervalId);
  }

  /**
   * Plays/pauses the video.
   * @param play true if video is to be played, paused otherwise
   */
  handlePlayPause(play) {
    if (play) {
      this.playerService.playVideo();
    }

    else {
      this.playerService.pauseVideo();
    }
  }

  /**
   * Jumps forwards/backwards in the video by the constant JUMP_SECONDS.
   * @param forwards true if jumping forwards, backwards otherwise
   */
  handleJump(forwards) {
    this.playerService.getCurrentTime().then((currentTime) => {
      let jump = currentTime;
      if (forwards) {
        jump += this.JUMP_SECONDS;
      }

      else {
        jump -= this.JUMP_SECONDS;
      }

      this.playerService.seekTo(jump).then(() => {
        this.playerService.playVideo();
      })
    });
  }

  /**
   * Seeks to another point in the track.
   * @param event state information
   */
  handleChangePlayHeadPos(event) {
    this.playerService.seekTo((event.layerX / this.timelineWidth) * this.duration);
  }

  /**
   * Starts a new loop in the track.
   * @param event loop information
   */
  handleSelection(event) {
    this.playerService.endLoop();
    let loopStart = (event.selectionStartPos / this.timelineWidth) * this.duration;
    let loopEnd = (event.selectionEndPos / this.timelineWidth) * this.duration;

    if (loopStart > loopEnd) {
      let temp = loopStart;
      loopStart = loopEnd;
      loopEnd = temp; 
    }

    this.playerService.startLoop(loopStart, loopEnd);
  }

  /**
   * Ends the loop.
   */
  handleEndSelection() {
    this.playerService.endLoop();
  }

  /**
   * Sets the volume of the player.
   * @param volume new volume, between 0 and 100
   */
  handleVolumeChange(volume) {
    this.playerService.setVolume(volume);
  }

  /**
   * Sets the playback rate of the player.
   * @param rate new playback rate
   */
  handlePlaybackRateChange(rate) {
    this.playerService.setPlaybackRate(rate);
  }

  /**
   * Changes the width of the timeline.
   * @param zoomLevel zoom level, between 0 and 100
   */
  handleZoomChange(zoomLevel) {
    // Zoom level step; may modify later
    let step = (screen.width*(this.duration - 1))/300;
    this.timelineWidth = screen.width + zoomLevel * step;
  }

}
