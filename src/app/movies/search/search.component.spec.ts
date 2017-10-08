import { fakeAsync,  tick } from '@angular/core/testing';
import { compose } from '@ngrx/store/src';
import { SEARCH_MOVIES, SELECT_MOVIE } from '../movies-actions';
import { State } from '../movies-reducers';
import { FakeStore } from '../../shared/testing/fakeStore';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fakeStore: FakeStore<State>;
  let fakeRouter: any = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    fakeStore = new FakeStore<State>();
    component = new SearchComponent(fakeStore as any, fakeRouter);
  });

  it('should execute search action when query is changed', fakeAsync(() => {
    component.ngOnInit();
    component.query = 'sample query';
    component.queryChanged();
    tick(401);
    expect(fakeStore.dispatch.calls.argsFor(0)[0]['type']).toEqual(SEARCH_MOVIES);
    expect(fakeStore.dispatch.calls.argsFor(0)[0]['payload']).toEqual('sample query');
  }));

  it('should properly remember when cursor is inside input or outside it', () => {
    component.onFocus();
    expect(component.cursorInsideInput).toBe(true);
    component.onBlur();
    expect(component.cursorInsideInput).toBe(false);
  });

  it('should unsubscribe from searchSubscription when component is destroyed', () => {
    component.ngOnInit();
    component['searchSubscription'].unsubscribe = jasmine.createSpy('searchSubscription');
    component.ngOnDestroy();
    expect(component['searchSubscription'].unsubscribe).toHaveBeenCalled();
  });

  it('should select movie when element in list is clicked', () => {
    const sampleMovie: any = { id: 103, title: 'someMovie' };
    component.selectMovie(sampleMovie);
    expect(fakeStore.dispatch.calls.argsFor(0)[0]['type']).toEqual(SELECT_MOVIE);
    expect(fakeStore.dispatch.calls.argsFor(0)[0]['payload']).toEqual(sampleMovie);
  });
});
