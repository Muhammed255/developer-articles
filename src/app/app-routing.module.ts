import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPagesComponent } from './layouts/admin-pages/admin-pages.component';
import { UserPagesComponent } from './layouts/user-pages/user-pages.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  { path: "", redirectTo: "/account/wall", pathMatch: "full" },
  {
    path: "account",
    component: UserPagesComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./layouts/user-pages/user-pages.module").then(
            (m) => m.UserPagesModule
          ),
      },
    ],
  },
  {
    path: "admin",
    component: AdminPagesComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./layouts/admin-pages/admin-pages.module").then(
            (m) => m.AdminPagesModule
          ),
      },
    ],
  },
  {
    path: "**",
    component: NotFoundComponent,
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
