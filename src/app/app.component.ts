import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
    this.http
      .post(
        'https://ng-guide-c2bed.firebaseio.com/posts.json',
        postData // body
      )
      .subscribe(responseData => console.log(responseData));
  }

  private onFetchPosts() {
    this.http
      .get('https://ng-guide-c2bed.firebaseio.com/posts.json')
      .pipe(
        map(respData => {
          const postsArray = [];
          for (const k in respData) {
            if (respData.hasOwnProperty(k)) {
              postsArray.push({ ...respData[k], id: k }); // id obj --Firebase
            }
          }
          return postsArray;
        })
      )
      .subscribe(posts => console.log(posts));
  }

  onClearPosts() { }
}
