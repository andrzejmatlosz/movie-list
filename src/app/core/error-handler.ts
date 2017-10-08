import { Injector } from '@angular/core';
import { ErrorModalService } from '../shared/error-modal/error-modal.service';
import { ErrorHandler, Injectable} from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  
  constructor(private injector: Injector) { }
  
  handleError(error) {
    const errorModalService = this.injector.get(ErrorModalService);
    errorModalService.openErrorModal({
      header: 'Unknown error',
      content: 'Some unknown error occurred'
    });

    throw error;
  }
}