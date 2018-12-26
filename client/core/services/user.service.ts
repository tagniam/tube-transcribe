import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
    // Hashmap to store local videos and markers
    private markers = {};

    constructor() { }

    /**
     * Saves a time marker to the database.
     * @param videoId string id of the youtube video id
     * @param timeStamp percentage of track where marker is
     */
    saveMarker(videoId: string, marker: number) {
        // Mock service, save it locally
        if (!this.markers[videoId]) {
           this.markers[videoId] = new BehaviorSubject<Array<Number>>([]);
        }
        let temp = this.markers[videoId].getValue();
        temp.push(marker);
        temp.sort();
        this.markers[videoId].next(temp);
    }

    /**
     * Returns the list of markers for a specific local video.
     * @param videoId id of the video to observe
     */
    getMarkers(videoId: string): Observable<Array<Number>> {
        if (!this.markers[videoId]) {
            this.markers[videoId] = new BehaviorSubject<Array<Number>>([]);
        }
        return this.markers[videoId].asObservable();        
    }
}