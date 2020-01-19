import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';

import { map, catchError, tap } from 'rxjs/operators';

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
      .post<{ name: string }>(
        'https://ng-guide-c2bed.firebaseio.com/posts.json', // url
        postData, // body
        {
          // clave de observación
          observe: 'response'
        }
      )
      .subscribe(
        responseData => {
          console.log(responseData.body)
        },
        error => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    return this.http
      .get<{ [key: string]: Post }>('https://ng-guide-c2bed.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
          params: searchParams
        }
      )
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
    return this.http.delete('https://ng-guide-c2bed.firebaseio.com/posts.json',
      {
        observe: 'events',
        responseType: 'text'
      }).pipe(
        tap(ev => {
          console.log(ev);
          if (ev.type === HttpEventType.Sent) {
            // ...
          }
          if (ev.type === HttpEventType.Response) {
            console.log(ev.body);
          }
        })
      )
  }
}
