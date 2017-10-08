import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject, Subscription } from 'rxjs/Rx';

import { MoviesService } from '../movies.service';
import { Movie } from '../movie';

import * as moviesReducers from '../movies-reducers';
import * as moviesActions from '../movies-actions';

@Component({
  selector: 'ml-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  public query: string = '';
  public movies$: Observable<Movie[]>;
  public cursorInsideInput: boolean = false;
  
  private searchTermStream = new Subject<string>()
  private searchSubscription: Subscription;

  constructor(private store: Store<moviesReducers.State>, private router: Router) { 
    this.movies$ = store.select(moviesReducers.getSearchMoviesListState);
  }

  public ngOnInit() {
    this.searchSubscription = this.searchTermStream
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(query => {
        this.store.dispatch(new moviesActions.SearchMovies(query));
      })
  }

  public ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  } 

  public queryChanged(): void {
    this.searchTermStream.next(this.query)
  }

  public selectMovie(movie: Movie): void {
    this.store.dispatch(new moviesActions.SelectMovie(movie));
    this.router.navigate([`movies/${movie.id}`]);
  }

  public onFocus(): void {
    this.cursorInsideInput = true;
  }

  public onBlur(): void {
    this.cursorInsideInput = false;
  }

}
