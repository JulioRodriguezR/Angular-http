import { Component, OnInit, OnDestroy } from '@angular/core';

import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  public loadedPosts = [];
  public error = null;

  private errorSub: Subscription; // baja de servicio

  constructor(private postsSrv: PostsService) { }

  ngOnInit() {
    this.errorSub = this.postsSrv.error
      .subscribe(errorMsg => {
        this.error = errorMsg;
      }
      );

    this.postsSrv.fetchPosts()
      .subscribe(posts => {
        this.loadedPosts = posts
      },
        error => {
          this.error = error.message;
        }
      );
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  onCreatePost(postData: Post) {
    this.postsSrv.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.postsSrv.fetchPosts()
      .subscribe(posts => {
        this.loadedPosts = posts
      },
        error => {
          this.error = error.message;
        }
      );
  }

  onClearPosts() {
    this.postsSrv.deletePost()
      .subscribe(() => {
        this.loadedPosts = [];
      })
  }
}
