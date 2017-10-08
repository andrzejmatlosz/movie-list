import {
    LoadMovies,
    LoadMoviesFail,
    LoadMoviesSuccess,
    SearchMovies,
    SearchMoviesFail,
    SearchMoviesSuccess,
    SelectMovie
} from './movies-actions';
import { reducer } from './movies-reducers';

describe('MoviesListComponent', () => {
  it('should start loading movies when action load movies is executed', () => {
    const initialState: any = { fakeProp: 'fakeValue', loading: false };
    const newState = reducer(initialState, new LoadMovies());
    expect(newState).toEqual({ fakeProp: 'fakeValue', loading: true } as any);
  });

  it('should remember loaded movies in state when action load movies success is executed', () => {
    const initialState: any = { movies: [{ id: 102 }], loading: true };
    const newState = reducer(initialState, new LoadMoviesSuccess([{ id: 103}, {id: 104}] as any));
    expect(newState.movies).toEqual([{ id: 102 }, { id: 103 }, { id: 104 }] as any);
    expect(newState.loading).toBe(false);
    expect(newState.loaded).toBe(true);
  });

  it('should start searching movies when action search movies is executed', () => {
    const initialState: any = { fakeProp: 'fakeValue', searching: false };
    const newState = reducer(initialState, new SearchMovies('some query'));
    expect(newState).toEqual({ fakeProp: 'fakeValue', searching: true, query: 'some query' } as any);
  });

  it('should remember search movies in state when action search movies success is executed', () => {
    const initialState: any = { searchMovies: [{ id: 102 }], searching: true };
    const newState = reducer(initialState, new SearchMoviesSuccess([{ id: 103}, {id: 104}] as any));
    expect(newState.searchMovies).toEqual([{ id: 103 }, { id: 104 }] as any);
    expect(newState.searching).toBe(false);
    expect(newState.searched).toBe(true);
  });

  it('should remember selected movie when action with the same name is executed', () => {
    const initialState: any = { movies: [{ id: 102 }, { id: 103 }, { id: 104 }] };
    const newState = reducer(initialState, new SelectMovie({ id: 103} as any));
    expect(newState.movies).toEqual([
      { id: 102, isSelected: false }, 
      { id: 103, isSelected: true }, 
      { id: 104, isSelected: false }
    ] as any);
    expect(newState.selectedMovie).toEqual({ id: 103 } as any); 
  });

  it('should set information about finish loading when error will occurr', () => {
    const initialState: any = { fakeProp: 'fakeValue', loading: true, loaded: false };
    const newState = reducer(initialState, new LoadMoviesFail('some error'));
    expect(newState).toEqual({ fakeProp: 'fakeValue', loading: false, loaded: false } as any);
  });

  it('should set information about finish searching when error will occurr', () => {
    const initialState: any = { fakeProp: 'fakeValue', searching: true, searched: false };
    const newState = reducer(initialState, new SearchMoviesFail('some error'));
    expect(newState).toEqual({ fakeProp: 'fakeValue', searching: false, searched: false } as any);
  });
});