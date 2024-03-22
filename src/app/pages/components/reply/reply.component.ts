import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentReplyService } from 'src/app/services/comment-reply.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss'],
})
export class ReplyComponent implements OnInit {
  @Input() replies: any[];
  @Input() authUser: any;

  isSelectedIndex = -1;
  isLoading = false;
  isEditing: boolean = false;
  replyText: string = '';

  constructor(
    private replyService: CommentReplyService,
    private snackBar: MatSnackBar,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
	}

  toggleEdit(index, replyTxt) {
    this.isSelectedIndex = index;
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.replyText = replyTxt; // Store the current comment text for editing
    }
  }

  updateReply(replyId) {
		this.isLoading = true;
		this.replyService.editReply(replyId, this.replyText).subscribe(
			(res) => {
				const index = this.replies.findIndex((rep) => rep.id === replyId);
				if (index !== -1) {
					this.replies[index] = res.updatedReply;
				}
				this.isLoading = false;
				this.isEditing = false;
				this.replyText = '';
				this.snackBar.open(res.msg, 'Success', { duration: 3000 });
				this.cd.detectChanges();
			},
			(error) => {
				console.error('Error updating reply:', error);
				this.isLoading = false;
				this.snackBar.open('Error updating reply', 'Error', { duration: 3000 });
			}
		);
	}


  cancelEdit() {
    // Reset the comment text and exit edit mode
    this.replyText = '';
    this.isEditing = false;
  }

  deleteReply(replyId: number) {
    this.isLoading = true;
    this.replyService.removeReply(replyId).subscribe(
      (res) => {
        if (res.success) {
          const index = this.replies.findIndex((c) => c.id === replyId);
          if (index !== -1) {
            this.replies.splice(index, 1);
            this.isLoading = false;
            this.cd.detectChanges();
          }

          this.snackBar.open(res.msg, 'Success', { duration: 3000 });
        }
      },
      (err) => console.log(err.error.msg)
    );
  }
}
