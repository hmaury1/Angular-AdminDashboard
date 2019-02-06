/**
 * Spinner animation widget.
 * authors: humberto maury
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModalComponent, ConfirmComponent, ConfirmYesNoComponent, PromptComponent } from './dialog.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatDialogModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';




@NgModule({
    imports: [ RouterModule, CommonModule, AgGridModule.withComponents([]), MatDialogModule, MatInputModule, MatButtonModule, FormsModule ],
    declarations: [ TableModalComponent, ConfirmComponent, ConfirmYesNoComponent, PromptComponent ],
    entryComponents: [ TableModalComponent, ConfirmComponent, ConfirmYesNoComponent, PromptComponent ],
    exports: [ TableModalComponent, ConfirmComponent, ConfirmYesNoComponent, PromptComponent ]
})

export class DialogModule {}
