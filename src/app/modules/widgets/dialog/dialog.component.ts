/**
 * Spinner animation widget.
 * authors: humberto maury
 */

import { Component, Input, Injectable, ViewContainerRef, Inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { GridOptions, ColGroupDef } from 'ag-grid-community';

@Component({
    selector: 'table-modal',
    template: `<h2 mat-dialog-title>{{title}}</h2>
      <mat-dialog-content>
        <div class="row">
          <ag-grid-angular class="ag-theme-material" [gridOptions]="gridOptions" style="width:800px; height:260px;">
          </ag-grid-angular>
        </div>
      </mat-dialog-content>
          <div class="clearfix">&nbsp;</div>
          <mat-dialog-actions>
              <button mat-raised-button (click)="closeDialog()">Close</button>
          </mat-dialog-actions>`
  })
  export class TableModalComponent implements OnInit {
    title = '';
    data_source = [];
    gridOptions: GridOptions;
    private colDef: ColGroupDef;
    closeDialog() {
      this.dialogRef.close();
    }

    constructor(vcr: ViewContainerRef,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<TableModalComponent>) {
      }
    ngOnInit(): void {
      this.title = this.data.title;
      this.data_source = this.data.data;
      this.gridOptions = this.data.options;
    }
  }

@Component({
    selector: 'confirm-modal',
    template: `<h2 mat-dialog-title>{{title}}</h2>
    <mat-dialog-content><div class="clearfix">&nbsp;</div> <div [innerHTML]="message"></div> </mat-dialog-content>
        <div class="clearfix">&nbsp;</div>
        <mat-dialog-actions>
            <button mat-raised-button (click)="closeDialog()">Close</button>
        </mat-dialog-actions>`
})
export class ConfirmComponent implements OnInit {
    title = '';
    message = '';

    constructor(vcr: ViewContainerRef,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<ConfirmComponent>) {

    }

    closeDialog() {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        this.title = this.data.title;
        this.message = this.data.message;
    }
}



@Component({
    selector: 'confirm-yesno-modal',
    template: `
    <h2 mat-dialog-title>
        {{data.title}}
    </h2>
    <mat-dialog-content><div class="clearfix">&nbsp;</div> <div [innerHTML]="data.message"></div> </mat-dialog-content>
    <div class="clearfix">&nbsp;</div>
    <mat-dialog-actions>
        <button mat-raised-button type="button" class="btn btn-link" (click)="closeDialog('no')">No</button>
        <button mat-raised-button type="button" class="btn btn-success btn-link" (click)="closeDialog('yes')">Yes
            <div class="ripple-container"></div>
        </button>
    </mat-dialog-actions>`
})
export class ConfirmYesNoComponent {
    constructor(vcr: ViewContainerRef,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<ConfirmYesNoComponent>) {

    }

    closeDialog(value) {
        this.data.fn(value);
        this.dialogRef.close();
    }

}

@Component({
  selector: 'prompt-modal',
  template: `<h2 mat-dialog-title>{{data.title}}</h2>
      <mat-dialog-content>
          <div class="clearfix">&nbsp;</div> <div [innerHTML]="data.message"></div>
          <mat-form-field>
              <input name="value" [(ngModel)]="data.value" required matInput />
          </mat-form-field>
      </mat-dialog-content>
      <div class="clearfix">&nbsp;</div>
      <mat-dialog-actions>
          <button mat-raised-button (click)="closeDialog(data.value)">Save</button>
          <button mat-raised-button (click)="closeDialog(null)">Cancel</button>
      </mat-dialog-actions>`
})
export class PromptComponent {
  constructor(vcr: ViewContainerRef,
      public dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<ConfirmYesNoComponent>) {

  }

  closeDialog(value) {
      this.data.fn(value);
      this.dialogRef.close();
  }

}
