import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;

  beforeEach(() => {
    component = new ListComponent();
    component.onScrollEndHandler = jasmine.createSpy('onScrollEndHandler');
    component.items = Array(30);
  });

  it('should not execute end scroll handler when scroll is not move in to the bottom', () => {
    component.onScrollEnd({end: 24});
    expect(component.onScrollEndHandler).not.toHaveBeenCalled();
  });

  it('should execute end scroll handler when scroll is move in to the bottom', () => {
    component.onScrollEnd({end: 30});
    expect(component.onScrollEndHandler).toHaveBeenCalled();
  });
});
