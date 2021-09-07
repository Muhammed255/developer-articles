import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ArticlePostService } from 'src/app/services/article-post.service';
import { AuthService } from 'src/app/services/auth.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.scss']
})
export class SingleArticleComponent implements OnInit {


  show_reply_box: boolean = false;
  auth_user: any;
  selectedIndex = -1;
  newComment = [];
  enabledComments = [];
  commentForm: FormGroup;
  commentReplyForm: FormGroup;

  topics: any[] = [];

  article: any;

  constructor(
    private articleService: ArticlePostService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private flasMessages: FlashMessagesService,
    private topicService: TopicService
  ) { }

  ngOnInit() {
    this.findArticle();
    this.createCommentForm();
    this.createCommentReplyForm();
    if(localStorage.getItem('userId')) {
      this.authService.findUserById(localStorage.getItem('userId')).subscribe(result => {
        this.auth_user = result.response.user;
      })
    }
    this.getTopics();
  }

  findArticle() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has("postId")) {
        return;
      }
      this.articleService
        .findOneArticle(paramMap.get("postId"))
        .subscribe((data) => {
          if (data.response.success) {
            this.article = data.response.article;
          } else {
            this.flasMessages.show(data.response.msg, {
              cssClass: "alert-danger",
              timeout: 5000,
            });
          }
        });
    });
  }

  getTopics() {
    this.topicService.getUserTopics().subscribe(res => {
      if(res.success) {
        this.topics = res.topics;
      }
    })
  }

  toggle(evt, index) {
    this.selectedIndex = index;
  }

  // Create form for posting comments
  createCommentForm() {
    this.commentForm = this.fb.group({
      comment: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(500),
        ]),
      ],
    });
  }

  createCommentReplyForm() {
    this.commentReplyForm = this.fb.group({
      reply: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(500),
        ]),
      ],
      commentId: [""],
      articleId: [""],
    });
  }

  // Enable the comment form
  enableCommentForm() {
    this.commentForm.get("comment").enable(); // Enable comment field
  }

  // Disable the comment form
  disableCommentForm() {
    this.commentForm.get("comment").disable(); // Disable comment field
  }

  // Function to post a new comment on blog post
  draftComment(id) {
    this.commentForm.reset(); // Reset the comment form each time users starts a new comment
    this.newComment = []; // Clear array so only one post can be commented on at a time
    this.newComment.push(id); // Add the post that is being commented on to the array
  }

  // Function to cancel new post transaction
  cancelSubmission(id) {
    const index = this.newComment.indexOf(id); // Check the index of the blog post in the array
    this.newComment.splice(index, 1); // Remove the id from the array to cancel post submission
    this.commentForm.reset(); // Reset  the form after cancellation
    this.enableCommentForm(); // Enable the form after cancellation
  }

  // Function to post a new comment
  postComment(id) {
    this.disableCommentForm(); // Disable form while saving comment to database
    const comment = this.commentForm.get("comment").value; // Get the comment value to pass to service function
    // Function to save the comment to the database
    this.articleService.commentArticle(id, comment).subscribe((data) => {
      this.findArticle();
      const index = this.newComment.indexOf(id); // Get the index of the blog id to remove from array
      this.newComment.splice(index, 1); // Remove id from the array
      this.enableCommentForm(); // Re-enable the form
      this.commentForm.reset(); // Reset the comment form
      if (this.enabledComments.indexOf(id) < 0) this.expand(id); // Expand comments for user on comment submission
    });
  }

  postReplyComment(articleId) {
    const reply = this.commentReplyForm.get("reply").value;
    const commentId = this.commentReplyForm.get("commentId").value;
    this.articleService
      .postCommentReply(articleId, commentId, reply)
      .subscribe((data) => {
        this.findArticle();
        this.commentReplyForm.reset();
      });
  }

  // Expand the list of comments
  expand(id) {
    this.enabledComments.push(id); // Add the current article id to array
  }

  // Collapse the list of comments
  collapse(id) {
    const index = this.enabledComments.indexOf(id); // Get position of id in array
    this.enabledComments.splice(index, 1); // Remove id from array
  }

  getDiferenceInDays(theDate: any): number {
    return (
      Math.abs(theDate.getHours() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
    );
  }

}
