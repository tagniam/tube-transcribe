import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { PlayerStates } from '../../enum/player-states.enum';

@Component({
  selector: 'control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.css']
})
export class ControlBarComponent implements OnInit {
  private isPlaying: boolean;
  private currentTime: number = 0;
  private duration: number = 0;

  private playHeadPos: number = 0;

  private timelineWidth: number = screen.width;

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
    setInterval(() => {
      if (this.isPlaying) {
        this.playerService.getCurrentTime().then(time => this.currentTime = time);
        this.playHeadPos = (this.currentTime / this.duration) * this.timelineWidth;
      }
    }, this.CHECK_MS);

    // Save duration of track
    this.playerService.getDuration().then(duration => this.duration = duration);
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
      if (forwards) {
        this.playerService.seekTo(currentTime + this.JUMP_SECONDS);
      }

      else {
        this.playerService.seekTo(currentTime - this.JUMP_SECONDS);
      }
    });
  }

  /**
   * Seeks to another point in the track.
   * @param event state information
   */
  handleChangePlayHeadPos(event) {
    this.playerService.endLoop();
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
   * Sets the volume of the player.
   * @param volume new volume, between 0 and 100
   */
  handleVolumeChange(volume) {
    this.playerService.setVolume(volume);
  }

}
