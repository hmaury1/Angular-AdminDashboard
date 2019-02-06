import { Component } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular/main";

@Component({
    selector: 'check-box',
    template: '<span><mat-checkbox [(ngModel)]="params.value" disabled></mat-checkbox><span>'
})
export class CheckboxComponent implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    refresh(): boolean {
        return false;
    }
}
