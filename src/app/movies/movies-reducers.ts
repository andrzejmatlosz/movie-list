import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Movie } from './movie';

import * as moviesActions from './movies-actions';

export interface State {
  loaded: boolean;
  loading: boolean;
  movies: Movie[];
  query: string;
  searched: boolean;
  searching: boolean;
  searchMovies: Movie[]
  selectedMovie: Movie
}

const initialState: State = {
  loaded: false,
  loading: false,
  movies: [],
  query: '',
  searched: false,
  searching: false,
  searchMovies: [],
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
        loading: true
      };
    }

    case moviesActions.LOAD_MOVIES_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        movies: [ ...state.movies, ...action.payload ]
      };
    }

    case moviesActions.LOAD_MOVIES_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }

    case moviesActions.SEARCH_MOVIES: {
      return {
        ...state,
        query: action.payload,
        searching: true
      };
    }

    case moviesActions.SEARCH_MOVIES_SUCCESS: {
      return {
        ...state,
        searched: true,
        searching: false,
        searchMovies: [ ...action.payload ]
      };
    }

    case moviesActions.SEARCH_MOVIES_FAIL: {
      return {
        ...state,
        searched: false,
        searching: false,
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
export const getSearchMoviesListState = createSelector(
  getMoviesState,
  (state: State) => state.searchMovies
);
export const getSelectedMovie = createSelector(
  getMoviesState,
  (state: State) => state.selectedMovie
);