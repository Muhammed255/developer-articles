import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Overlay } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './Interceptors/auth-interceptor';
import { ErrorInterceptor } from './Interceptors/error-interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminAuthGuard, AuthGuard } from './guards/auth.guard';
import { CommentModule } from './pages/components/comment/comment.module';
import { CommentsListComponent } from './pages/components/comments-list/comments-list.component';
import { UsersListComponent } from './pages/components/users-list/users-list.component';
import { ErrorComponent } from './pages/error/error.component';
import { CreateDate } from './pipes/create-date.pipe';
import { PipesModule } from './pipes/pipes.module';
import { ArticlePostService } from './services/article-post.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { MenuService } from './services/menu.service';
import { TopicService } from './services/topic.service';
import { MaterialModule } from './shared/material.module';
import { NotFoundComponent } from './shared/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    UsersListComponent,
    CommentsListComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommentModule,
    PipesModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthGuard,
    AdminAuthGuard,
    ArticlePostService,
    AuthService,
    CategoryService,
    TopicService,
    FlashMessagesService,
    Overlay,
    MenuService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    // AddEditPostComponent,
    ErrorComponent,
    CommentsListComponent,
  ],
  exports: [CreateDate, ],
})
export class AppModule {}
