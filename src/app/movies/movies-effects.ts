import { ErrorModalService } from '../shared/error-modal/error-modal.service';
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

import { LoadMovies, SearchMovies } from './movies-actions';
import { MoviesService } from './movies.service';
import { Movie } from './movie';
import * as moviesActions from './movies-actions';

@Injectable()
export class MoviesEffects {

  private nextPageToLoad: number = 1;

  @Effect()
  loadMovies$: Observable<Action> = this.actions$
    .ofType(moviesActions.LOAD_MOVIES)
    .switchMap((loadMoviesAction: LoadMovies) => {
      let getMoviesStream: Observable<Movie[]>;
      if (this.nextPageToLoad < 3) {
        const fisrtPage = this.moviesService.getMovies(1);
        const secondPage = this.moviesService.getMovies(2);
        const thirdPage = this.moviesService.getMovies(3);
        getMoviesStream = fisrtPage.concat(secondPage).concat(thirdPage);
        this.nextPageToLoad = 3;
      } else {
        getMoviesStream = this.moviesService.getMovies(this.nextPageToLoad);
      }

      return getMoviesStream
        .map((movies: Movie[]) => {
          this.nextPageToLoad++;
          return new moviesActions.LoadMoviesSuccess(movies);
        })
        .catch(error => {
          this.errorModalService.openErrorModal({
            header: 'Search error',
            content: 'During loading movies an error occurred'
          });
          return of(new moviesActions.LoadMoviesFail(error))
        });
    });

  @Effect()
  searchMovies$: Observable<Action> = this.actions$
    .ofType(moviesActions.SEARCH_MOVIES)
    .switchMap((searchMoviesAction: SearchMovies) => {
      if (searchMoviesAction.payload) {
        return this.moviesService.searchMovies(searchMoviesAction.payload)
          .map((movies: Movie[]) => {
            return new moviesActions.SearchMoviesSuccess(movies);
          })
          .catch(error => {
            this.errorModalService.openErrorModal({
              header: 'Search error',
              content: 'During searching movies an error occurred'
            });
            return of(new moviesActions.SearchMoviesFail(error))
          });
      } else {
        return Observable.of(new moviesActions.SearchMoviesSuccess([]));
      }
    });

  constructor(private actions$: Actions, 
    private moviesService: MoviesService, 
    private errorModalService: ErrorModalService) {}
}
