import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    getUser(user): Observable<any> {
        return this.http.get(`http://localhost:3000/api/user/${user._id}`).map(res => res.json());
    }

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