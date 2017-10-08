import { Action } from '@ngrx/store';
import { Movie } from './movie';

export const LOAD_MOVIES = '[Movies] Load';
export const LOAD_MOVIES_SUCCESS = '[Movies] Load Success';
export const LOAD_MOVIES_FAIL = '[Movies] Load Fail';

export const SEARCH_MOVIES = '[Movies] Search';
export const SEARCH_MOVIES_SUCCESS = '[Movies] Search Success';
export const SEARCH_MOVIES_FAIL = '[Movies] Search Fail';

export const SELECT_MOVIE = '[Movie] Select';

export class LoadMovies implements Action {
  readonly type = LOAD_MOVIES;
}

export class LoadMoviesSuccess implements Action {
  readonly type = LOAD_MOVIES_SUCCESS;

  constructor(public payload: Movie[]) {}
}

export class LoadMoviesFail implements Action {
  readonly type = LOAD_MOVIES_FAIL;

  constructor(public payload: any) {}
}

export class SearchMovies implements Action {
  readonly type = SEARCH_MOVIES;

  constructor(public payload: string) {}
}

export class SearchMoviesSuccess implements Action {
  readonly type = SEARCH_MOVIES_SUCCESS;

  constructor(public payload: Movie[]) {}
}

export class SearchMoviesFail implements Action {
  readonly type = SEARCH_MOVIES_FAIL;

  constructor(public payload: any) {}
}

export class SelectMovie implements Action {
  readonly type = SELECT_MOVIE;

  constructor(public payload: Movie) {}
}

export type Actions =
  | LoadMovies
  | LoadMoviesSuccess
  | LoadMoviesFail
  | SearchMovies
  | SearchMoviesSuccess
  | SearchMoviesFail
  | SelectMovie;