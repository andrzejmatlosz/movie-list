import { Component, Input } from '@angular/core';

@Component({
  selector: 'ml-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {

  public fullStars: Array<number>;
  public halfStars: Array<number>;
  public emptyStars: Array<number>;
  public value: number;

  @Input() public set rating(value) {
    this.value = value;
    this.fullStars = Array(Math.floor(value));
    this.halfStars = Array(value - this.fullStars.length > 0.5 ? 1 : 0);
    this.emptyStars = Array(10 - this.fullStars.length - this.halfStars.length);
  }
}
