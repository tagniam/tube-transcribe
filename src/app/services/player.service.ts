import { Injectable } from '@angular/core';

import * as YouTubePlayer from 'youtube-player';

@Injectable()
export class PlayerService {
  private player: YouTubePlayer;
  private videoId: string;

  /* Default player vars for the video */
  private static playerVars = {
    'autoplay': 1,
    'controls': 0,
    'autohide': 1,
    'showinfo': 0,
    'rel': 0,
    'loop': 1
  };

  constructor() { }

  /**
   * Injects a YouTube iframe into the div with the given id.
   * @param divId HTML div id reference
   */
  setup(divId: string): void {
    this.player = YouTubePlayer(divId, {
      playerVars: PlayerService.playerVars
      // TODO implement events
    });
  }

  /**
   * Loads a YouTube video with the given id.
   * @param videoId YouTube video id
   * @param startSeconds starting point of the video in seconds
   * @param suggestedQuality video playback quality; see YouTube iFrame API
   */
  loadVideoById(videoId: string, startSeconds?: number, suggestedQuality?: string): void {
    this.videoId = videoId;
    this.player.loadVideoById({
      videoId: videoId,
      startSeconds: startSeconds,
      suggestedQuality: suggestedQuality
    });
  } 

}
