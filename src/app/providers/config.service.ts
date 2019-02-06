import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { AppSettings } from '../models/app-settings';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
    constructor(private http: HttpClient) { }
    getConfiguration() {
        return this.http.get('./assets/config.json').subscribe((result: any) => {
            AppSettings.API_URL = result['url'];
            AppSettings.API_URL_AUTH = result['url_windows_auth'];
            AppSettings.version = result['version'];
            AppSettings.login_title = result['login_title'];
            AppSettings.dashboard_title = result['dashboard_title'];
            AppSettings.logo = result['logo'];
        });
    }
}
