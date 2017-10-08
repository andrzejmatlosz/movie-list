import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MoviesService } from '../movies.service';
import { Movie } from '../movie';

import * as moviesReducers from '../movies-reducers';
import * as moviesActions from '../movies-actions';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  public movies$: Observable<Movie[]>;
  public fetchMoreMovies: () => void;

  private moviesSubscription: Subscription;

  constructor(private store: Store<moviesReducers.State>) { 
    this.movies$ = store.select(moviesReducers.getMoviesListState);
    this.fetchMoreMovies = this.loadMoviesPage.bind(this);
  }

  public ngOnInit() {
    this.loadMoviesPage();
  }

  public loadMoviesPage() {
    this.store.dispatch(new moviesActions.LoadMovies());
  }
}
