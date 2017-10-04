import { Router } from '@angular/router/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/concat';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import { LoadMovies } from './movies-actions';
import { MoviesService } from './movies.service';
import { Movie } from './movie';
import * as moviesActions from './movies-actions';

@Injectable()
export class MoviesEffects {

  private nextPageToLoad: number = 1;

  @Effect()
  loadMovies$: Observable<Action> = this.actions$
    .ofType(moviesActions.LOAD_MOVIES)
    .switchMap((LoadMoviesAction: LoadMovies) => {
      if (this.nextPageToLoad < 3) {
        const fisrtPage = this.moviesService.getMovies(1);
        const secondPage = this.moviesService.getMovies(2);
        const thirdPage = this.moviesService.getMovies(3);
        return fisrtPage.concat(secondPage).concat(thirdPage)
          .map((movies: Movie[]) => {
            this.nextPageToLoad = 4;
            return new moviesActions.LoadMoviesSuccess(movies);
          })
          .catch(error => of(new moviesActions.LoadMoviesFail(error)));
      } else {
        return this.moviesService.getMovies(this.nextPageToLoad)
          .map((movies: Movie[]) => {
            this.nextPageToLoad++;
            return new moviesActions.LoadMoviesSuccess(movies);
          })
          .catch(error => of(new moviesActions.LoadMoviesFail(error)))
      }
    });

  constructor(private actions$: Actions, private moviesService: MoviesService) {}
}
