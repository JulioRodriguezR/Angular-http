import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './post.model';
import { PostsService } from './posts.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public loadedPosts = [];

  constructor(private postsSrv: PostsService) { }

  ngOnInit() {
    this.postsSrv.fetchPosts()
      .subscribe(posts => {
        this.loadedPosts = posts
      });
  }

  onCreatePost(postData: Post) {
    this.postsSrv.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.postsSrv.fetchPosts()
      .subscribe(posts => {
        this.loadedPosts = posts
      });
  }

  onClearPosts() {
    this.postsSrv.deletePost()
      .subscribe(() => {
        this.loadedPosts = [];
      })
  }
}
