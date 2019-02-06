import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AppSettings } from '../models/app-settings';
import { SpinnerService } from '../modules/widgets/spinner/spinner.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
   constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  canActivate() {
    if (sessionStorage.getItem('token')) {
      return true;
    }
    this.router.navigate(['/pages/login']);
    return false;
  }

  postAuthentication(name: string, password: string): Observable<any> {
    return this.http
      .post(
        AppSettings.API_URL + 'api/Auth/PostAuthentication',
        {
          name: name,
          password: password
        }
      );
  }

  clear(): any {
    sessionStorage.removeItem('token');
    localStorage.removeItem('sub_data');
  }

  logout(): void {
    this.clear();
    document.location.href = '';
  }

  getToken(name: string, password: string): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const data = 'grant_type=password&username=' + name + '&password=' + password;
      return this.http.post(AppSettings.API_URL + 'login', data, { headers: headers });
  }

  getUser(): Observable<any> {
      return this.http.get(AppSettings.API_URL_AUTH + '/api/Auth/', { withCredentials: true });
  }
}
