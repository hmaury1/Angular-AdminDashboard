import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';


const types: Notification_types[] = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];
const positions = ['top', 'bottom'];
const aligns = ['left', 'center', 'right'];
declare const $: any;

export type Notification_types = '' | 'info' | 'success' | 'warning' | 'danger' | 'rose' | 'primary';

@Injectable()
export class NotificationService {
    constructor(public snackBar: MatSnackBar) {}

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    show(
        message: string = '',
        type: Notification_types = types[1],
        icon: string = 'notifications',
        position: string = positions[0],
        align: string = aligns[2],
        timer: number = 3000) {

        if (this.isMobileMenu()) {
            this.snackBar.open(message, '', {
                duration: 3000
            });
        } else {
            $.notify({
                icon: icon,
                message: message
            }, {
                type: type,
                timer: timer,
                placement: {
                    from: position,
                    align: align
                },
                template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
                        '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">' +
                        '<i class="material-icons">close</i></button>' +
                        '<i class="material-icons" data-notify="icon">notifications</i> ' +
                        '<span data-notify="title">{1}</span> ' +
                        '<span data-notify="message">{2}</span>' +
                        '<div class="progress" data-notify="progressbar">' +
                        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" ' +
                        'aria-valuemin="0" aria-valuemax="100" style="width: 0%;"> </div>' +
                        '</div>' +
                        '<a href="{3}" target="{4}" data-notify="url"></a>' +
                        '</div>'
            });
        }
    }
}
