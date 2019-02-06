/**
 * Spinner animation widget.
 * authors: humberto maury
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpinnerFullScreen } from './spinner.component';

export { SpinnerService } from './spinner.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ SpinnerFullScreen ],
    exports: [ SpinnerFullScreen ]
})

export class SpinnerModule {}
