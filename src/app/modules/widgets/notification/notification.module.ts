/**
 * notification widget.
 * authors: humberto maury
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
export { NotificationService } from './notification.service';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [  ],
    exports: [  ]
})

export class NotificationModule {}
