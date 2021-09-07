import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { mimeType } from "src/app/helpers/mime-type.validator";
import { ArticlePostService } from 'src/app/services/article-post.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: "app-add-edit-post",
  templateUrl: "./add-edit-post.component.html",
  styleUrls: ["./add-edit-post.component.scss"],
})
export class AddEditPostComponent implements OnInit {
  htmlContent = "<h2>Hello</h2>";
  imagePreview: string;
  form: FormGroup;
  articleId: string;
  headerTitle = 'Add New Article';

  topics: any[];
  topicIndex;
  topic;
  article;

  constructor(
    public dialogRef: MatDialogRef<AddEditPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private articleService: ArticlePostService,
    private topicService: TopicService
  ) {}

  ngOnInit() {
    this.initForm();
    if(this.data) {
      this.articleId = this.data.articleId;
      this.data = {
        title: this.form.value.title,
        sub_title: this.form.value.sub_title,
        content: this.form.value.content,
        topicId: this.form.value.topicId,
        article_image: this.form.value.article_image
      }
      this.setDataToForm(this.articleId);
      this.headerTitle = 'Edit Article Post'
    }
    this.topicService.getUserTopics().subscribe(data => {
      if(data.success) {
        this.topics = data.topics;
        this.topicIndex = this.topics.findIndex(top => top?._id === this.topic?._id);
        console.log(this.topicIndex)

      }
    })
  }

  setDataToForm(id) {
    this.articleService.findOneArticle(id).subscribe(data => {
      if(data.response.success) {
        this.topic = data.response.article.topicId;
        this.article = data.response.article;
        this.form.patchValue(data.response.article);
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  initForm() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(10)],
      }),
      sub_title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(15)],
      }),
      content: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(20)],
      }),
      topicId: new FormControl(null, { validators: [Validators.required] }),
      article_image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType.bind(this)],
      }),
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ article_image: file });
    this.form.get('article_image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
        this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
}
}
