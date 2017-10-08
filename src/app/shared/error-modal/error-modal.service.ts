import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { ErrorModalContent } from './error-modal-content';

@Injectable()
export class ErrorModalService {
  private errorModalStream: Subject<ErrorModalContent> = new Subject<ErrorModalContent>();

  public openErrorModal(errorModalContent: ErrorModalContent): void {
    this.errorModalStream.next(errorModalContent);
  }

  public getErrorModalStream(): Subject<ErrorModalContent> {
    return this.errorModalStream;
  }
}