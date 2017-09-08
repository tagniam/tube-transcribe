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

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    // Subscribe to player state
    this.playerService.getPlayerState().subscribe((state) => {
      this.isPlaying = state == PlayerStates.PLAYING || state == PlayerStates.BUFFERING; 
    });
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

}
