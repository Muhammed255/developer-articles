import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { DashboardComponent } from "./dashboard.component";
import { TilesComponent } from "./tiles/tiles.component";
import { MaterialModule } from "src/app/shared/material.module";

export const routes = [
  { path: "", component: DashboardComponent, pathMatch: "full" },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [DashboardComponent, TilesComponent],
})
export class DashboardModule {}
