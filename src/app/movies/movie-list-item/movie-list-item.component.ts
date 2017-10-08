import { Component, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Movie } from '../movie';
import * as moviesReducers from '../movies-reducers';
import * as moviesActions from '../movies-actions';

@Component({
  selector: 'ml-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.css']
})
export class MovieListItemComponent {

  @Input() public movie: Movie;
  @Input() public index: number;

  constructor(private router: Router, private store: Store<moviesReducers.State>) { }

  @HostListener('click')
  public selectMovie() {
    this.store.dispatch(new moviesActions.SelectMovie(this.movie));
    this.router.navigate([`movies/${this.movie.id}`]);
  }

}
