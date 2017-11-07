import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from './services/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private playerService: PlayerService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let videoId = params['v'];
      // Reroute to home page if no video id given
      if (videoId == undefined) {
        this.router.navigateByUrl('');
      }
      else {
        this.playerService.setup('youtube-player', videoId);
      }
    });
  }

}
