import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { MOVIE_DISCOVER_DB_URL, MOVIE_SEARCH_DB_URL } from '../core/configuration';
import { Movie } from './movie';

@Injectable()
export class MoviesService {
  constructor(private http: Http) {}

  public getMovies(pageNumber: number): Observable<Movie[]> {
    return this.http.get(`${MOVIE_DISCOVER_DB_URL}&page=${pageNumber}`)
      .map(this.extractData);
  }

  public searchMovies(query): Observable<Movie[]> {
    return this.http.get(`${MOVIE_SEARCH_DB_URL}&query=${query}`)
      .map(this.extractData);
  }

  private extractData(res: Response): Movie[] {
    let body = res.json();
    return body && body.results ? body.results : [];
  }
}