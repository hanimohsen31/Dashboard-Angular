import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from './../../../environments/environment';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // takes token in incoded shape
  currentUser: any = new BehaviorSubject(null);
  currentUserObservable = this.currentUser.asObservable();

  isAdmin: any = new BehaviorSubject(false);

  isLoggedin: any = new BehaviorSubject(false);
  isLoggedinObservable = this.isLoggedin.asObservable();

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    let token: any = localStorage.getItem('userToken');
    if (token) {
      localStorage.setItem('userToken', token);
      this.currentUser.next(token);
      this.isLoggedin.next(true);
      if (jwt_decode<any>(token).sub.rule == 'admin') {
        this.isAdmin.next(true);
      }
    }
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser;
  }

  // front-end update only
  updateCurrentUser(token: any): Observable<any> {
    localStorage.setItem('userToken', token);
    this.isLoggedin.next(true);
    return this.currentUser.next(token);
  }

  register(userData: any): Observable<any> {
    let url = environment.backendurl + '/register';
    return this._HttpClient.post(url, userData);
  }

  login(userData: any): Observable<any> {
    let url = environment.backendurl + '/login';
    return this._HttpClient.post(url, userData);
  }

  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('isAdmin');
    this.currentUser.next(null);
    this.isAdmin.next(false);
    this.isLoggedin.next(false);
    this._Router.navigate(['/login']);
    // window.location.reload();
  }
}
