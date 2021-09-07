import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TruncateModule } from '@yellowspot/ng-truncate';
import { AuthProfileComponent } from './auth-profile.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TruncateModule
  ],
  declarations: [AuthProfileComponent]
})
export class AuthProfileModule { }
