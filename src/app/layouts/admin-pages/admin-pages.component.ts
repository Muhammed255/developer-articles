import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AddEditPostComponent } from 'src/app/admin-pages/add-edit-post/add-edit-post.component';
import { ArticlePostService } from 'src/app/services/article-post.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-pages',
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.scss'],
})
export class AdminPagesComponent implements OnInit, OnDestroy {
  auth_user: any;
  menu = 'vertical';

  articleSubListener: Subscription;

  constructor(
    private cd: ChangeDetectorRef,
    public authService: AuthService,
    public dialog: MatDialog,
    private articleService: ArticlePostService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.authService
      .findUserById(this.authService.getUserId())
      .subscribe((data) => {
        if (data.response.success) {
          this.auth_user = data.response.user;
          this.cd.detectChanges();
        }
      });
  }

  addPostDialog() {
    const dialogRef = this.dialog.open(AddEditPostComponent, {
      width: '100%',
      height: '685px',
    });

    dialogRef.afterClosed().pipe(filter(res => typeof res === "object")).subscribe((result) => {
      console.log(result);
      this.articleService.newPost(
        result.title,
        result.sub_title,
        result.content,
        result.article_image,
        result.topicId
      );
      // .subscribe((data) => {
      //   if (data.response.success) {
      //     this.articleService.getArticles();
      //     this.articleSubListener = this.articleService.getArticlesStatusListener().subscribe((artData: {articles: any[]}) => {
      //         artData.articles.push(data.response.article);
      //         this.snackBar.open(data.response.msg, "success", {
      //           duration: 5000,
      //         });
      //     });
      //   }
      // });
    });
  }

  ngOnDestroy() {
    this.articleSubListener.unsubscribe();
  }
}
