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

  /**
   * Plays the video.
   */
  playVideo(): Promise<void> {
    return this.player.playVideo();
  }

  /**
   * Pauses the video.
   */
  pauseVideo(): Promise<void> {
    return this.player.pauseVideo();
  }

  /**
   * Stops the video.
   */
  stopVideo(): Promise<void> {
    return this.player.stopVideo();
  }

  /**
   * Seeks to a specified time in the video.
   * @param seconds time to which player should advance
   */
  seekTo(seconds: number): Promise<void> {
    // Allows seek ahead
    return this.player.seekTo(seconds, true);
  }

  /**
   * Sets the volume of the video.
   * @param volume level of volume, between 0 and 100
   */
  setVolume(volume: number): Promise<void> {
    return this.player.setVolume(volume);
  }

  /**
   * Returns the elapsed time in seconds since the video started playing.
   */
  getCurrentTime(): Promise<number> {
    return this.player.getCurrentTime();
  }

  /**
   * Returns the duration of the video in seconds.
   */
  getDuration(): Promise<number> {
    return this.player.getDuration();
  }

  /**
   * Returns the set of playback rates in which the current video is available.
   */
  getAvailablePlaybackRates(): Promise<Array<number>> {
    return this.player.getAvailablePlaybackRates();
  }

  /**
   * Sets the suggested playback rate for the current video.
   * @param suggestedRate playback rate , should be in getAvailablePlaybackRates
   */
  setPlaybackRate(suggestedRate: number): Promise<void> {
    return this.player.setPlaybackRate(suggestedRate);
  }

}
