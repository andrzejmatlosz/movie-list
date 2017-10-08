import { RatingComponent } from './rating.component';

describe('RatingComponent', () => {
  let component: RatingComponent;

  beforeEach(() => {
    component = new RatingComponent();
  });

  it('should create proper stars', () => {
    component.rating = 7.3;
    expect(component.fullStars.length).toEqual(7);
    expect(component.halfStars.length).toEqual(0);
    expect(component.emptyStars.length).toEqual(3);

    component.rating = 7.8;
    expect(component.fullStars.length).toEqual(7);
    expect(component.halfStars.length).toEqual(1);
    expect(component.emptyStars.length).toEqual(2);
  });
});
