import { SELECT_MOVIE } from '../movies-actions';
import { State } from '../movies-reducers';
import { FakeStore } from '../../shared/testing/fakeStore';
import { MovieListItemComponent } from './movie-list-item.component';

describe('MovieListItemComponent', () => {
  let component: MovieListItemComponent;
  let fakeStore: FakeStore<State>;
  let fakeRouter: any = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    fakeStore = new FakeStore<State>();
    component = new MovieListItemComponent(fakeRouter, fakeStore as any);
  });

  it('should execute select movie action when movie item is clicked', () => {
    component.movie = {
      id: 101,
      title: 'some movie'
    }as any;
    component.selectMovie();
    expect(fakeStore.dispatch.calls.argsFor(0)[0]['type']).toEqual(SELECT_MOVIE);
    expect(fakeStore.dispatch.calls.argsFor(0)[0]['payload']).toEqual(component.movie);
    expect(fakeRouter.navigate).toHaveBeenCalledWith([`movies/101`]);
  });
});
