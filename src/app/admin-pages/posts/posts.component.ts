import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { ArticlePostService } from 'src/app/services/article-post.service';
import { AuthService } from 'src/app/services/auth.service';
import { AddEditPostComponent } from '../add-edit-post/add-edit-post.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  articles: any[] = [];
  articleSubListener: Subscription;

  constructor(
    private articleService: ArticlePostService,
    private authService: AuthService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    this.articleService.getSpceficAdminArticles(this.authService.getUserId());

    this.articleSubListener = this.articleService
      .getArticlesStatusListener()
      .subscribe((articleData: { articles: any[] }) => {
        this.articles = articleData.articles;
      });
  }

  editPostDialog(id: string) {
    const dialogRef = this.dialog.open(AddEditPostComponent, {
      width: '100%',
      height: '685px',
      data: { articleId: id },
    });

    dialogRef.afterClosed().pipe(filter(res => typeof res === "object")).subscribe((result) => {
      
      this.articleService.updateArticle(
        id,
        result?.title,
        result?.sub_title,
        result?.content,
        result?.article_image,
        result?.articleId
      );
      // .subscribe((data) => {
      //   if (data.response.success) {
      //     this.getArticles();
      //     this.snackBar.open(data.response.msg, 'success', {
      //       duration: 5000,
      //     });
      //   }
      // });
    });
  }

  onDeleteArticle(id: string) {
    this.articleService.deleteArticle(id);
    // .subscribe((data) => {
    //   if (data.response.success) {
    //     this.getArticles();
    //     this.snackBar.open(data.response.msg, 'success', {
    //       duration: 5000,
    //     });
    //   }
    // });
  }

  ngOnDestroy() {
    this.articleSubListener.unsubscribe();
  }
}
