import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { User } from '../../../models/user';
import { Router } from '@angular/router';
import { AuthGuard } from '../../../providers/auth-guards';
import { SpinnerService } from '../../widgets/spinner/spinner.component';
import { NotificationService } from '../../widgets/notification/notification.module';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { FormControl } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-login-cmp',
  templateUrl: './login.component.html',
  styleUrls: ['./style.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  test: Date = new Date();
  private toggleButton: any;
  private sidebarVisible: boolean;
  private nativeElement: Node;
  user = '';
  password = '';
  model: User = new User();
  passwordControl = new FormControl();
  usernameControl = new FormControl();

  constructor(private element: ElementRef,
    private authService: AuthGuard,
    private router: Router,
    private notification: NotificationService,
    private spinner: SpinnerService
  ) {
    this.authService.clear();
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');
    body.classList.add('off-canvas-sidebar');
    const card = document.getElementsByClassName('card')[0];
    setTimeout(function () {
      // after 1000 ms we add the class animated to the login/register card
      card.classList.remove('card-hidden');
    }, 700);
  }

  sidebarToggle() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    const sidebar = document.getElementsByClassName('navbar-collapse')[0];
    if (this.sidebarVisible === false) {
      setTimeout(function () {
        toggleButton.classList.add('toggled');
      }, 500);
      body.classList.add('nav-open');
      this.sidebarVisible = true;
    } else {
      this.toggleButton.classList.remove('toggled');
      this.sidebarVisible = false;
      body.classList.remove('nav-open');
    }
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');
    body.classList.remove('off-canvas-sidebar');
  }

  sign() {
    if (this.user === undefined || this.user === null || this.user === '') {
      this.notification.show('The user is required.');
      return;
    }
    if (this.password === undefined || this.password === null || this.password === '') {
      this.notification.show('The password is required.');
      return;
    }
    this.model.name = this.user;
    this.spinner.show();
    this.authService.getToken(this.user, this.password).subscribe((_respuesta) => {
      this.spinner.hide();
      localStorage.removeItem('clientSubs');
      localStorage.removeItem('dataSubs');
      sessionStorage.setItem('token', _respuesta.split(' ')[1]);
      localStorage.setItem('sub_data', this.model.name);
      this.router.navigate(['/']);
    });
  }

  windows() {
    this.spinner.show();
    this.authService.getUser().subscribe((data) => {
      this.spinner.hide();
      if (!data.success) {
        sessionStorage.removeItem('token');
        localStorage.removeItem('sub_data');
        this.notification.show('the user doesn´t exist');
      } else {
        this.spinner.show();
        this.authService.getToken(data.sub, '').subscribe((_respuesta) => {
          this.spinner.hide();
          sessionStorage.setItem('token', _respuesta.access_token);
          localStorage.setItem('sub_data', data.sub);
          this.router.navigate(['/']);
        }, error => {
          this.spinner.hide();
          sessionStorage.removeItem('token');
          localStorage.removeItem('sub_data');
          if (error.status === 400) {
            this.notification.show(JSON.parse(error._body).error_description);
          } else {
            this.notification.show('there is an error processing the request', 'danger');
          }
        });
      }
    }, error => {
      this.spinner.hide();
      sessionStorage.removeItem('token');
      localStorage.removeItem('sub_data');
      this.notification.show('there is an error processing the request', 'danger');
    });
  }
}
