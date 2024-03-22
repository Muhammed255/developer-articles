import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material.module';
import { ArticleCardModule } from '../components/article-card/article-card.module';
import { CommentModule } from '../components/comment/comment.module';
import { SearchModule } from '../search/search.module';
import { SingleArticlePostComponent } from './single-article-post.component';

const routes: Routes = [
	{path: "", component: SingleArticlePostComponent, pathMatch: 'full'}
]

@NgModule({
  imports: [
    CommonModule,
		ArticleCardModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		SearchModule,
		RouterModule.forChild(routes),
		CommentModule,
  ],
  declarations: [SingleArticlePostComponent],
  exports: [SingleArticlePostComponent],
})
export class SingleArticlePostModule { }
