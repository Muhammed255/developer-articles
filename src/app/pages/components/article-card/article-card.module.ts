import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material.module';
import { CommentModule } from '../comment/comment.module';
import { ArticleCardComponent } from './article-card.component';

@NgModule({
  imports: [
    CommonModule,
		RouterModule,
		MaterialModule,
		CommentModule
  ],
  declarations: [ArticleCardComponent],
	exports: [ArticleCardComponent]
})
export class ArticleCardModule { }
