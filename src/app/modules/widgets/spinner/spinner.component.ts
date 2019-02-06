/**
 * Spinner animation widget.
 * authors: humberto maury
 */

import { Component, Input, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SpinnerService {

  public spinnerObservable = new Subject<boolean>();

  constructor() { }

  show() {
    this.spinnerObservable.next(true);
  }

  hide() {
    this.spinnerObservable.next(false);
  }
}

/**
 * Spinner component.
 *
 */
@Component({
  selector: 'spinner-fullscreen',
  preserveWhitespaces: false,
  template: `
    <div class="black-overlay" *ngIf="showSpinner" ></div>
    <div class="loading-text" *ngIf="showSpinner">
      <div class="loader">
        <svg class="circular" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
        </svg>
      </div>
    </div>
  `,
   styleUrls: ['./spinner.scss'],
})
export class SpinnerFullScreen {

  spinnerSubscription;
  showSpinner: boolean;

  constructor(private spinnerService: SpinnerService) {
    this.spinnerSubscription = this.spinnerService.spinnerObservable.subscribe(flag => {
      this.showSpinner = flag;
    });
  }
}

