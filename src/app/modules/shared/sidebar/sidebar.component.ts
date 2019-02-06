import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { SpinnerService } from '../../widgets/spinner/spinner.module';
import { AuthGuard } from '../../../providers/auth-guards';
import { Response } from '@angular/http';
import { AppSettings } from '../../../models/app-settings';
import { NotificationService } from '../../widgets/notification/notification.module';
import { ClientService } from '../../../providers/client.service';
import { Option } from '../../../models/option';

declare const $: any;

// Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['style.scss']
})
export class SidebarComponent implements OnInit {

    public menuItems: any[];
    version = '';
    title = '';
    logo = '';
    username;

    constructor(
        private authService: AuthGuard,
        private notification: NotificationService,
        private spinner: SpinnerService,
        private client: ClientService
    ) { }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        this.version = AppSettings.version;
        this.title = AppSettings.dashboard_title;
        this.logo = AppSettings.logo;
        const _name = localStorage.getItem('sub_data');
        if (_name) {
            this.username  = _name.charAt(0).toUpperCase() + _name.slice(1);
        }
        this.renderMenu();
    }

    renderMenu() {
        this.spinner.show();
        this.client.getOptions().subscribe((menu: any) => {
            this.menuItems = menu.map((item) => {
                //const iconType = iconTypes.find( icon => icon.name === item.name);
                return {
                    ...item,
                    path: item.path,
                    title: item.name,
                    type: 'link',
                    icontype: item.icon,
                    collapse: undefined,
                    children: null
                };
            });
            this.spinner.hide();
        }, error => {
            this.notification.show('there is an error processing the request', 'danger');
            this.spinner.hide();
        });
    }

    saveOption(option) {
        this.client.saveCurrentOption(option);
    }

    updatePS(): void  {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            const ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
        }
    }

    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

    logout() {
        this.authService.logout();
    }
}
