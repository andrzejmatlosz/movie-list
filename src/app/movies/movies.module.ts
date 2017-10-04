import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MovieRoutingModule } from './movie-routing.module';

import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieHomeComponent } from './movie-home/movie-home.component';
import { MovieListItemComponent } from './movie-list-item/movie-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MovieRoutingModule
  ],
  declarations: [
    MoviesListComponent, 
    MovieDetailsComponent, 
    MovieHomeComponent, MovieListItemComponent
  ]
})
export class MoviesModule {
}
