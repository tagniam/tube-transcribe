import { Component, OnInit } from '@angular/core';
import { PlayerService } from './services/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Placeholder video
  private videoId = 'br190bnPOLY';

  constructor(private playerService: PlayerService) {

  }

  ngOnInit() {
    this.playerService.setup('youtube-player', this.videoId);
  }

}
