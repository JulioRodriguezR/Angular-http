import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http
      .post(
        'https://ng-guide-c2bed.firebaseio.com/posts.json',
        postData // body
      )
      .subscribe(responseData => console.log(responseData));
  }

  private onFetchPosts() {
    // Send Http request
    this.http.get('https://ng-guide-c2bed.firebaseio.com/posts.json')
      .subscribe(posts => console.log(posts));
  }

  onClearPosts() {
    // Send Http request
  }
}
