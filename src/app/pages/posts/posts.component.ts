import { Component, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { ArticlePostService } from "src/app/services/article-post.service";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"],
})
export class PostsComponent implements OnInit {
  articles: any[];

  auth_user: any;


  constructor(
    private articleService: ArticlePostService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.matIconRegistry
      .addSvgIcon(
        "thumb_up_outline",
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          "../../../../assets/icons/thumb-up-outline.svg"
        )
      )
      .addSvgIcon(
        "thumb_up_filled",
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          "../../../../assets/icons/thumb-up-filled.svg"
        )
      )
      .addSvgIcon(
        "thumb_down_outline",
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          "../../../../assets/icons/thumb-down-outline.svg"
        )
      )
      .addSvgIcon(
        "thumb_down_filled",
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          "../../../../assets/icons/thumb-down-filled.svg"
        )
      );
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      if(params.has("search")) {
        this.articleService.article_search(params.get("search")).subscribe(res => {
          if(res.success) {
            this.articles = res.articles;
          }
        })
      } else {
        this.getArticles();
      }
      
    })
    if(localStorage.getItem("userId")) {
      this.authService.findUserById(localStorage.getItem("userId")).subscribe(data => {
        if(data.response.success) {
          this.auth_user = data.response.user;
        }
      })
    }
    this.getArticles();
  }

  getArticles() {
    this.articleService.getArticles().subscribe((data) => {
      if (data.response.success) {
        this.articles = data.response.articles;
      }
    });
  }

  disableIfLiked(item) {
    return item.likedBy.find(p => {return p._id === this.auth_user._id});
  }

  disableIfDisLiked(item) {
    return item.dislikedBy.find(p => {return p._id === this.auth_user._id});
  }

  onLikeArticle(id) {
    this.articleService.likeArticle(id).subscribe(data => {
      if(data.response.success) {
        this.getArticles();
      }
    })
  }

  onDisLikeArticle(id) {
    this.articleService.dislikeArticle(id).subscribe(data => {
      if(data.response.success) {
        this.getArticles();
      }
    })
  }

  onAddToBookmarksClicked(id) {
    if(this.auth_user.bookmarks.includes(id)) {
      this.articleService.removeFromBookmarks(id).subscribe(data => {
        if(data.response.success) {
          let index = this.auth_user.bookmarks.indexOf(id);
          this.auth_user.bookmarks.splice(index, 1);
          this.snackBar.open('Article removed from your bookmarks', 'success', {duration: 3000})
        }
      })
    } else {
      this.articleService.addToBookmarks(id).subscribe(data => {
        if(data.response.success) {
          this.auth_user.bookmarks.push(id);
          this.snackBar.open('Article added to your bookmarks', 'success', {duration: 3000})
        }
      })
    }
  }

}
