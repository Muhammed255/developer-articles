import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticlePostService } from './services/article-post.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { TopicService } from './services/topic.service';
import { AuthInterceptor } from './Interceptors/auth-interceptor';
import { AdminAuthGuard, AuthGuard } from './guards/auth.guard';
import { AddEditPostComponent } from './admin-pages/add-edit-post/add-edit-post.component';
import { Overlay } from '@angular/cdk/overlay';
import { MaterialModule } from './shared/material.module';
import { MenuService } from './services/menu.service';
import { ErrorComponent } from './pages/error/error.component';
import { ErrorInterceptor } from './Interceptors/error-interceptor';

@NgModule({
  declarations: [AppComponent, ErrorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
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
  entryComponents: [AddEditPostComponent, ErrorComponent],
})
export class AppModule {}
