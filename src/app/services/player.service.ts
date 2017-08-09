import { Injectable } from '@angular/core';

import * as YouTubePlayer from 'youtube-player';

@Injectable()
export class PlayerService {
  private player: YouTubePlayer;

  constructor() { }

  /**
   * Injects a YouTube iframe into the div with the given id.
   * @param divId HTML div id reference
   */
  setup(divId: string) {
    this.player = YouTubePlayer(divId);
  }

}
