import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Movie } from './movie';

import * as moviesActions from './movies-actions';

export interface State {
  loaded: boolean;
  loading: boolean;
  movies: Movie[];
  selectedMovie: Movie
}

const initialState: State = {
  loaded: false,
  loading: false,
  movies: [],
  selectedMovie: null
};

export function reducer(
  state = initialState,
  action: moviesActions.Actions
): State {
  switch (action.type) {
    case moviesActions.LOAD_MOVIES: {
      return {
        ...state,
        loading: true,
      };
    }

    case moviesActions.LOAD_MOVIES_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        movies: [ ...state.movies, ...action.payload ],
      };
    }

    case moviesActions.SELECT_MOVIE: {
      const newMoviesArray = state.movies.map((movie: Movie) => {
        return {
          ...movie,
          isSelected: false
        };
      });
      const selectedMovie = newMoviesArray.find((movie: Movie) => {
        return movie.id === action.payload.id;
      });
      if (selectedMovie) {
        selectedMovie.isSelected = true;
      }

      return {
        ...state,
        movies: newMoviesArray,
        selectedMovie: action.payload
      }
    }

    default: {
      return state;
    }
  }
}

export const getMoviesState = createFeatureSelector<State>('movies');
export const getMoviesListState = createSelector(
  getMoviesState,
  (state: State) => state.movies
);
export const getSelectedMovie = createSelector(
  getMoviesState,
  (state: State) => state.selectedMovie
);