import { BehaviorSubject } from 'rxjs/Rx';

export class FakeStore<T> {
  private subject: BehaviorSubject<T>;

  constructor() {
    this.subject = new BehaviorSubject<T>(null);
  }

  public addValueToFakeStore(value: T) {
    this.subject.next(value);
  }

  public select(param: any): BehaviorSubject<T> {
    return this.subject;
  }

  public dispatch = jasmine.createSpy('dispatch');
}