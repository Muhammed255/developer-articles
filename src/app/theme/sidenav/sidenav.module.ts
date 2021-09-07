import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidenavComponent } from './sidenav.component';
import { VerticalMenuComponent } from '../vertical-menu/vertical-menu.component';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule
  ],
  declarations: [SidenavComponent, VerticalMenuComponent],
  exports: [SidenavComponent]
})
export class SidenavModule { }
