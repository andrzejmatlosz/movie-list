import { Movie } from '../movie';
import { FakeStore } from '../../shared/testing/fakeStore';
import { MovieDetailsComponent } from './movie-details.component';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fakeStore: FakeStore<Movie>
  let fakeRouter: any = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    fakeStore = new FakeStore<Movie>();
    component = new MovieDetailsComponent(fakeStore as any, fakeRouter);
  });

  it('should properly read movie from store during init', () => {
    const sampleMovie: any = { title: 'someMovie' };
    fakeStore.addValueToFakeStore(sampleMovie as any);
    component.ngOnInit();
    expect(component.movie).toEqual(sampleMovie);
  });

  it('should navigate to /movies state when there is no movie in store', () => {
    component.ngOnInit();
    expect(component.movie).toBe(undefined);
    expect(fakeRouter.navigate).toHaveBeenCalledWith(['/movies']);
  });

  it('should unsubscribe from selected movie stream when component is destoy', () => {
    component.ngOnInit();
    component['movieSubscription'].unsubscribe = jasmine.createSpy('unsubscribe');
    component.ngOnDestroy();
    expect(component['movieSubscription'].unsubscribe).toHaveBeenCalled();
  });
});
