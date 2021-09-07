import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MaterialModule } from "src/app/shared/material.module";
import { CategoriesComponent } from "src/app/admin-pages/categories/categories.component";
import { AddEditCategoryComponent } from "src/app/admin-pages/add-edit-category/add-edit-category.component";
import { TopicsComponent } from "src/app/admin-pages/topics/topics.component";
import { AddEditTopicComponent } from "src/app/admin-pages/add-edit-topic/add-edit-topic.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PostsComponent } from 'src/app/admin-pages/posts/posts.component';
import { AuthProfileModule } from 'src/app/pages/auth-profile/auth-profile.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SingleArticleComponent } from 'src/app/admin-pages/single-article/single-article.component';
import { AdminAuthGuard } from "src/app/guards/auth.guard";
import { AuthProfileComponent } from "src/app/pages/auth-profile/auth-profile.component";
import { RouterModule, Routes } from "@angular/router";
import { FlashMessagesModule } from "angular2-flash-messages";
import { AddEditPostComponent } from "src/app/admin-pages/add-edit-post/add-edit-post.component";
import { AdminPagesComponent } from "./admin-pages.component";
import { SidenavModule } from "src/app/theme/sidenav/sidenav.module";



const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("../../pages/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
        data: { breadcrumb: "Dashboard" },
        canActivate: [AdminAuthGuard],
      },
      {
        path: "add-category",
        component: AddEditCategoryComponent,
        data: { breadcrumb: "Add | Edit Category" },
        canActivate: [AdminAuthGuard],
      },
      {
        path: "category/:catId",
        component: AddEditCategoryComponent,
        data: { breadcrumb: "Add | Edit Category" },
        canActivate: [AdminAuthGuard],
      },
      {
        path: "categories",
        component: CategoriesComponent,
        data: { breadcrumb: "Categories" },
        canActivate: [AdminAuthGuard],
      },
      {
        path: "add-topic",
        component: AddEditTopicComponent,
        data: { breadcrumb: "Add | Edit Topic" },
        canActivate: [AdminAuthGuard],
      },
      {
        path: "topic/:topicId",
        component: AddEditTopicComponent,
        data: { breadcrumb: "Add | Edit Topic" },
        canActivate: [AdminAuthGuard],
      },
      {
        path: "topics",
        component: TopicsComponent,
        data: { breadcrumb: "Topics" },
        canActivate: [AdminAuthGuard],
      },
      // {
      //   path: 'add-post',
      //   component: AddEditPostComponent,
      //   data: { breadcrumb: "Add | Edit Post" },
      //   canActivate: [AdminAuthGuard]
      // },
      {
        path: 'post/:postId',
        component: SingleArticleComponent,
        data: { breadcrumb: "Single Post" },
        canActivate: [AdminAuthGuard]
      },
      {
        path: "posts",
        component: PostsComponent,
        data: { breadcrumb: "Posts" },
        canActivate: [AdminAuthGuard],
      },
      {
        path: ":username",
        component: AuthProfileComponent,
        canActivate: [AdminAuthGuard],
      },
    ],
  },
];




@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule,
    AuthProfileModule,
    AngularEditorModule,
    SidenavModule
  ],
  declarations: [
    CategoriesComponent,
    AddEditCategoryComponent,
    TopicsComponent,
    AddEditTopicComponent,
    AddEditPostComponent,
    PostsComponent,
    SingleArticleComponent,
    AdminPagesComponent
  ]
})
export class AdminPagesModule {}
