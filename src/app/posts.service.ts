import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';

import { Post } from './post.model';
import { Subject, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  public error = new Subject<string>();

  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content }
    this.http
      .post(
        'https://ng-guide-c2bed.firebaseio.com/posts.json', // url
        postData // body
      )
      .subscribe(
        responseData => {
          console.log(responseData)
        },
        error => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    return this.http
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
        }),
        // Task to handle mistakes
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  deletePost() {
    return this.http.delete('https://ng-guide-c2bed.firebaseio.com/posts.json');
  }
}
