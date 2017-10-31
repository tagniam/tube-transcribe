import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    constructor() { }

    /**
     * Saves a time marker to the database.
     * @param videoId string id of the youtube video id
     * @param timeStamp time in seconds of marker
     */
    saveMarker(videoId: string, timeStamp: number) {
        // Mock service, print for now
        console.log('Timestamp saved at ' + timeStamp + 's with video id ' + videoId);
    }
}