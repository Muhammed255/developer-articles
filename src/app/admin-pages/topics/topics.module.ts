import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { MaterialModule } from 'src/app/shared/material.module';
import { TopicsComponent } from './topics.component';

const routes: Routes = [
  { path: '', component: TopicsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
		MaterialModule,
    RouterModule.forChild(routes),
    FlashMessagesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [TopicsComponent],
  exports: [TopicsComponent],
})
export class TopicsModule { }
