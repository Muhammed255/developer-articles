// comment.module.ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReplyComponent } from '../reply/reply.component';
import { CommentComponent } from './comment.component';

@NgModule({
  declarations: [CommentComponent, ReplyComponent],
  imports: [
    CommonModule,
    PipesModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [CommentComponent, ReplyComponent],
})
export class CommentModule {}
