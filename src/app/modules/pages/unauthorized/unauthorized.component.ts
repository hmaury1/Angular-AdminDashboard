import { Component, ViewContainerRef, OnInit, OnDestroy, ElementRef } from '@angular/core';

@Component({
    selector: 'app-unauthorized',
    templateUrl: './template.html'
})

export class UnauthorizedComponent implements OnInit, OnDestroy {

    test: any = null;

    constructor(private element: ElementRef) { }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);
    }

    ngOnDestroy() {
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('login-page');
      body.classList.remove('off-canvas-sidebar');
    }
 }
