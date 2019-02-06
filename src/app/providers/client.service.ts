import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettings } from '../models/app-settings';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Option } from '../models/option';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ClientService {

    constructor(private http: HttpClient, private router: Router) {
    }

    getOptions(): Observable<Option[]> {
        return this.http.get<Option[]>(AppSettings.API_URL + 'users/getMenu');
    }

    getRoute(menu): any {
        return this.router.config.find(item => item.path === menu);
    }

    unauthorized(): void {
        this.router.navigate(['/pages/unauthorized']);
    }

    root(): void {
        this.router.navigate(['/']);
    }

    saveCurrentOption(option) {
        localStorage.setItem('currentOption', JSON.stringify(option));
    }

    getCurrentOption(): Option {
        const option = localStorage.getItem('currentOption');
        if (option !== null) {
           return JSON.parse(option);
        }
        return null;
    }
}
