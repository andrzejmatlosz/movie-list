import { Input, Component, ContentChild, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { ChangeEvent } from 'angular2-virtual-scroll';

@Component({
  selector: 'ml-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {

  @Input() public items: Array<any>;
  @Input() public onScrollEndHandler: () => void;
  @ContentChild(TemplateRef) public innerTemplate: TemplateRef<any>;

  constructor() { }

  public onScrollEnd(event: ChangeEvent) {
    if (event.end !== this.items.length) return;
    if (this.onScrollEndHandler) {
      this.onScrollEndHandler();
    }
  }

}
