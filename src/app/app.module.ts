import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { StoreModule, combineReducers } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { reducer } from './movies/movies-reducers';
import { MoviesEffects } from './movies/movies-effects';
import { MoviesService } from './movies/movies.service';
import { ErrorModalService } from './shared/error-modal/error-modal.service';
import { GlobalErrorHandler } from './core/error-handler'; 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    HttpModule,
    StoreModule.forRoot({ movies: reducer }),
    EffectsModule.forRoot([MoviesEffects])
  ],
  providers: [
    MoviesService, 
    ErrorModalService,
    {
      provide: ErrorHandler, 
      useClass: GlobalErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
