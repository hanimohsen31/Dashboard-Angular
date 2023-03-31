import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth/services/auth.service';
import jwt_decode from 'jwt-decode';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  token: any;
  subscription: Subscription;
  isLoggedIn: any = false;
  user: any;
  username: any;

  constructor(private _AuthService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this._AuthService.currentUserObservable.subscribe({
      next: (response: any) => {
        this.token = response;
        if (response) {
          this.isLoggedIn = true;
          this.user = jwt_decode<any>(response).sub;
          this.username = this.user?.fname + ' ' + this.user?.lname;
          // change profile pic based on gender
          if (!this.user.image && this.user.gender == 'male') {
            this.user.image = 'assets/images/images/ma.png';
          } else if (!this.user.image && this.user.gender == 'female') {
            this.user.image = 'assets/images/images/fa.png';
          } else if (!this.user.image && !this.user.gender ){
            this.user.image = 'assets/images/images/ma.png';
          }
        }
      },
    });
  }

  logout() {
    this._AuthService.logout();
  }
}
