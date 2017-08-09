import { Injectable } from '@angular/core';

import * as YouTubePlayer from 'youtube-player';

enum PlayerStates {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  VIDEO_CUED = 5
};

@Injectable()
export class PlayerService {
  private player: YouTubePlayer;
  private videoId: string;
  private loopId;

  /* Default player vars for the video */
  private static readonly playerVars = {
    'autoplay': 1,
    'controls': 0,
    'autohide': 1,
    'showinfo': 0,
    'rel': 0,
    'loop': 1
  };
  
  private static readonly CHECK_LOOP_MS = 10;

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
   * Plays the video if it is paused, pauses video if video is playing.
   */
  playPauseVideo(): Promise<void> {
    this.player.getPlayerState().then(state => {
      if (state == PlayerStates.PLAYING || 
          state == PlayerStates.BUFFERING) {
        return this.pauseVideo();
      }
    });
    return this.playVideo();
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

  /**
   * Starts a loop for the video.
   * @param startSeconds starting point of the loop in seconds
   * @param endSeconds ending point of the loop in seconds
   */
  startLoop(startSeconds: number, endSeconds: number): Promise<void> {
    // Seek to startSeconds when endSeconds is reached
    return this.seekTo(startSeconds).then(() => {
      // Keep track of id to clear loop later
      this.loopId = setInterval(() => {
        this.getCurrentTime().then(currentTime => {
          if (currentTime >= endSeconds) {
            this.seekTo(startSeconds);
          }
        }); 
      }, PlayerService.CHECK_LOOP_MS);
    });
  }

  /**
   * Ends any loop that was started with startLoop().
   */
  endLoop(): void {
    if (this.loopId) {
      clearInterval(this.loopId);
    }
  }

}
