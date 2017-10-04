import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VirtualScrollModule } from 'angular2-virtual-scroll';

import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    VirtualScrollModule
  ],
  declarations: [
    HomeComponent, 
    ListComponent
  ],
  exports: [
    HomeComponent, 
    ListComponent
  ]
})
export class SharedModule { }
