import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FlashMessagesModule } from "angular2-flash-messages";
import { PostsComponent } from "src/app/pages/posts/posts.component";
import { LoginComponent } from "src/app/pages/login/login.component";
import { SignupComponent } from "src/app/pages/signup/signup.component";
import { AdminSignupComponent } from "src/app/pages/admin-signup/admin-signup.component";
import { SingleArticlePostComponent } from 'src/app/pages/single-article-post/single-article-post.component';
import { AuthProfileComponent } from 'src/app/pages/auth-profile/auth-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthProfileModule } from 'src/app/pages/auth-profile/auth-profile.module';
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/guards/auth.guard";
import { MaterialModule } from "src/app/shared/material.module";
import { UserPagesComponent } from "./user-pages.component";
import { TopicArticlesComponent } from "src/app/pages/topic-articles/topic-articles.component";
import { SearchModule } from "src/app/pages/search/search.module";


const routes: Routes = [
  {
    path: "",
    children: [
      { path: "wall", component: PostsComponent },
      { path: "home", component: PostsComponent, canActivate: [AuthGuard] },
      { path: "login", component: LoginComponent },
      { path: "signup", component: SignupComponent },
      { path: "admin-signup", component: AdminSignupComponent },
      { path: "articles/:articleId", component: SingleArticlePostComponent },
      { path: "topic-articles/:topicId", component: TopicArticlesComponent },
      {
        path: ":username",
        component: AuthProfileComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];



@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    FlashMessagesModule,
    FormsModule,
    ReactiveFormsModule,
    AuthProfileModule,
    SearchModule
  ],
  declarations: [
    PostsComponent,
    LoginComponent,
    SignupComponent,
    AdminSignupComponent,
    SingleArticlePostComponent,
    UserPagesComponent,
    TopicArticlesComponent,
  ]
})
export class UserPagesModule {}
