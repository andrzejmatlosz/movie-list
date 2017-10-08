import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VirtualScrollModule } from 'angular2-virtual-scroll';

import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { RatingComponent } from './rating/rating.component';
import { ErrorModalComponent } from './error-modal/error-modal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    VirtualScrollModule
  ],
  declarations: [
    HomeComponent, 
    ListComponent, 
    RatingComponent, 
    ErrorModalComponent
  ],
  exports: [
    HomeComponent, 
    ListComponent,
    RatingComponent,
    ErrorModalComponent
  ]
})
export class SharedModule { }
