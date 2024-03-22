import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TruncateModule } from '@yellowspot/ng-truncate';
import { MaterialModule } from 'src/app/shared/material.module';
import { ArticleCardModule } from '../components/article-card/article-card.module';
import { ArticleModule } from '../components/article/article.module';
import { CommentModule } from '../components/comment/comment.module';
import { AuthProfileComponent } from './auth-profile.component';

const routes: Routes = [
	{path: "", component: AuthProfileComponent, pathMatch: 'full'}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TruncateModule,
		MaterialModule,
		CommentModule,
		ArticleModule,
		ArticleCardModule
  ],
  declarations: [AuthProfileComponent],
  exports: [AuthProfileComponent],
})
export class AuthProfileModule { }
