import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('ytURL') url;

  constructor(private router: Router) { }

  ngOnInit() { }

  handleURLSubmit() {
    let urlText = this.url.nativeElement.value;
    let params = this.parseQueryString(urlText.substring(urlText.indexOf('?') + 1));
    if (params['v']) {
      this.router.navigateByUrl('watch?v=' + params['v']);
    }
  }

  parseQueryString(queryString) {
    var params = {}, queries, temp, i, l;
    // Split into key/value pairs
    queries = queryString.split("&");
    // Convert the array of strings into an object
    for (i = 0, l = queries.length; i < l; i++) {
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }
    return params;
  }
}