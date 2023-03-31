import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './../auth/services/auth.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private _HttpClient: HttpClient,
    private _AuthService: AuthService,
    private _Router:Router
  ) {}

  getusers(): Observable<any> {
    let url = environment.backendurl + '/users';
    return this._HttpClient.get(url);
  }

  getUser(id: any): Observable<any> {
    let url = environment.backendurl;
    let token: any = localStorage.getItem('userToken') || 'null';
    let user = jwt_decode<any>(token)?.sub;

    if (this._AuthService.isAdmin.getValue()) {
      return this._HttpClient.get(url + '/user/' + id);
    } else if (user?.id == id) {
      return this._HttpClient.get(url + '/user/' + id);
    } else if (user?.id != id) {
      this._Router.navigate(['/not-found']);
      return this._HttpClient.get('undefined');
    } else {
      this._Router.navigate(['/not-found']);
      return this._HttpClient.get('undefined');
    }
  }

  updateUser(id: any, userData: any): Observable<any> {
    let url = environment.backendurl + '/user/' + id;
    return this._HttpClient.post(url, { data: userData, id: id });
  }

  deleteUser(id: any): Observable<any> {
    let url = environment.backendurl + '/user/' + id;
    return this._HttpClient.delete(url);
  }
}
