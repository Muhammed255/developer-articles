import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment.prod';

const BACKEND_URL = environment.backendUrl + '/articles/';

@Injectable({
  providedIn: 'root',
})
export class ArticlePostService {
  private postSubListener = new Subject<{ articles: any[] }>();
  private articles: any[] = [];

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  newPost(
    title: string,
    sub_title: string,
    content: string,
    article_image: File,
    topicId: string
  ) {
    const articleData = new FormData();
    articleData.append('title', title);
    articleData.append('sub_title', sub_title);
    articleData.append('content', content);
    articleData.append('article_image', article_image, title);
    articleData.append('topicId', topicId);

    // return this.http.post<{ response: any }>(
    //   BACKEND_URL + "add-post",
    //   articleData
    // );

    this.http
      .post<{ response: any }>(BACKEND_URL + 'add-post', articleData)
      .subscribe((res) => {
        if (res.response.success) {
          this.articles.push(res.response.article);
          this.snackBar.open(res.response.msg, 'success', {
            duration: 5000,
          });
        }
      });
  }

  getArticles() {
    return this.http.get<{ response: any }>(BACKEND_URL + 'get-articles');
  }

  getArticlesStatusListener() {
    return this.postSubListener.asObservable();
  }

  findOneArticle(id: string) {
    return this.http.get<{ response: any }>(BACKEND_URL + id);
  }

  updateArticle(
    id: string,
    title: string,
    sub_title: string,
    content: string,
    article_image: File,
    topicId: string
  ) {
    let articleData: FormData | any;

    if (typeof article_image === 'object') {
      articleData = new FormData();
      articleData.append('title', title);
      articleData.append('sub_title', sub_title);
      articleData.append('content', content);
      articleData.append('article_image', article_image, title);
      articleData.append('topicId', topicId);
    } else {
      articleData = {
        _id: id,
        title,
        sub_title,
        content,
        article_image,
        topicId,
      };
    }

    // return this.http.put<{ response: any }>(BACKEND_URL + id, articleData);
    this.http
      .put<{ response: any }>(BACKEND_URL + id, articleData)
      .subscribe((data) => {
        if (data.response.success) {
          const articlePost = [...this.articles];
          const postIndex = articlePost.findIndex((art) => art._id === id);
          articlePost[postIndex] = data.response.newArticle;
          this.snackBar.open(data.response.msg, 'success', {
            duration: 5000,
          });
        }
      });
  }

  deleteArticle(id: string) {
    // return this.http.delete<{ response: any }>(BACKEND_URL + id);
    this.http.delete<{ response: any }>(BACKEND_URL + id).subscribe((data) => {
      if (data.response.success) {
        const articlePost = [...this.articles];
        const postIndex = articlePost.findIndex((art) => art._id === id);
        if (postIndex > -1) {
          articlePost.splice(postIndex, 1);
        }
        this.snackBar.open(data.response.msg, 'success', {
          duration: 5000,
        });
      }
    });
  }

  commentArticle(id: string, comment: string) {
    const commentData = { id, comment };
    return this.http.post<{ response: any }>(
      BACKEND_URL + 'add-comment',
      commentData
    );
  }

  postCommentReply(postId, commentId, reply) {
    // Create blogData to pass to backend
    const commentReplyData = {
      reply: reply,
      commentId: commentId,
      postId: postId,
    };
    return this.http.post(BACKEND_URL + 'do-reply', commentReplyData);
  }

  likeArticle(id) {
    return this.http.post<{ response: any }>(BACKEND_URL + 'like-article', {
      id,
    });
  }

  dislikeArticle(id) {
    return this.http.post<{ response: any }>(BACKEND_URL + 'dislike-article', {
      id,
    });
  }

  addToBookmarks(id) {
    return this.http.put<{ response: any }>(
      BACKEND_URL + 'add-to-bookmark/' + id,
      id
    );
  }

  removeFromBookmarks(id) {
    return this.http.put<{ response: any }>(
      BACKEND_URL + 'remove-from-bookmark/' + id,
      id
    );
  }

  getSpceficAdminArticles(id) {
    this.http
      .get<{ response: any }>(BACKEND_URL + 'admin-articles/' + id)
      .pipe(
        map((articleData) => {
          return {
            articles: articleData.response.articles.map((art) => {
              return {
                _id: art._id,
                title: art.title,
                sub_title: art.sub_title,
                content: art.content,
                article_image: art.article_image,
                topicId: art.topicId,
                autherId: art.autherId,
                comments: art.comments,
                created: art.created,
                likedBy: art.likedBy,
                dislikedBy: art.dislikedBy,
                likes: art.likes,
                dislikes: art.dislikes,
              };
            }),
            maxArticles: articleData.response.maxArticles,
          };
        })
      )
      .subscribe((transformedArticles) => {
        (this.articles = transformedArticles.articles),
          this.postSubListener.next({
            articles: [...this.articles],
          });
      });
  }

  getArticlesByTopic(topicId) {
    return this.http.get<{
      success: boolean;
      msg: string;
      articles: any[];
      topic: any;
    }>(BACKEND_URL + 'topic-articles/' + topicId);
  }

  article_search(searchString) {
    return this.http.post<{ success: boolean; msg: string; articles: any[] }>(
      BACKEND_URL + 'search-article',
      { searchString }
    );
  }
}
