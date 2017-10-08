import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { ErrorModalService } from './error-modal.service';
import { ErrorModalContent } from './error-modal-content';

@Component({
  selector: 'ml-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent {

  public visible: boolean;
  public header: string;
  public content: string;

  constructor(errorModalService: ErrorModalService, private changeDetector: ChangeDetectorRef) { 
    errorModalService.getErrorModalStream().subscribe((errorModalContent: ErrorModalContent) => {
      this.visible = true;
      this.header = errorModalContent.header;
      this.content = errorModalContent.content;
      this.changeDetector.detectChanges();
    });
  }

  close() {
    this.visible = false;
    this.changeDetector.detectChanges();
  }

}
