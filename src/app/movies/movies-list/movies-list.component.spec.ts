import { LOAD_MOVIES } from '../movies-actions';
import { State } from '../movies-reducers';
import { FakeStore } from '../../shared/testing/fakeStore';
import { MoviesListComponent } from './movies-list.component';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fakeStore: FakeStore<State>

  beforeEach(() => {
    fakeStore = new FakeStore<State>();
    component = new MoviesListComponent(fakeStore as any);
  });

  it('should load movies during initialization', () => {
    component.ngOnInit();
    expect(fakeStore.dispatch).toHaveBeenCalled();
    expect(fakeStore.dispatch.calls.argsFor(0)[0]['type']).toEqual(LOAD_MOVIES);
  });
});
