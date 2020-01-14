import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { Post } from './post.model';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content }
    this.http
      .post(
        'https://ng-guide-c2bed.firebaseio.com/posts.json',
        postData // body
      )
      .subscribe(responseData => console.log(responseData));
  }

  fetchPosts() {
    this.http
      .get<{ [key: string]: Post }>('https://ng-guide-c2bed.firebaseio.com/posts.json')
      .pipe(
        map(respData => {
          const postsArray: Post[] = [];
          for (const k in respData) {
            if (respData.hasOwnProperty(k)) {
              postsArray.push({ ...respData[k], id: k }); // id obj --Firebase
            }
          }
          return postsArray;
        })
      )
      .subscribe(posts => { });
  }

  onClearPosts() { }
}
