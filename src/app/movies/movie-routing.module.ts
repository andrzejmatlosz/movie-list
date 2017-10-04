import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieHomeComponent } from './movie-home/movie-home.component';

const movieRoutes: Routes = [
  {
    path: '',
    component: MoviesListComponent,
    children: [
      {
        path: '',
        component: MovieHomeComponent,
      },
      {
        path: ':id',
        component: MovieDetailsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(movieRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MovieRoutingModule { }