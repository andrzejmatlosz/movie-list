import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Rx';

import * as moviesReducers from '../movies-reducers';
import { Movie } from '../movie';
import { POSTER_URL } from '../../core/configuration';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {

  public movie: Movie;

  private movieSubscription: Subscription;
  private posterUrl: string;

  constructor(private store: Store<moviesReducers.State>) { 
    this.posterUrl = POSTER_URL;
  }

  public ngOnInit() {
    this.movieSubscription = this.store.select(moviesReducers.getSelectedMovie).subscribe((movie: Movie) => {
      this.movie = movie;
    })
  }

  public ngOnDestroy() {
    this.movieSubscription.unsubscribe();
  }

}
