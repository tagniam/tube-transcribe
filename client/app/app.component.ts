import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from './services/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Placeholder video
  private videoId;

  constructor(private playerService: PlayerService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // Default video is Josh Turner's Sorry, Banjo
      this.videoId = params['v'] || 'br190bnPOLY';
      this.playerService.setup('youtube-player', this.videoId);
    });
  }

}
