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
  image: any;

  constructor(private _AuthService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this._AuthService.currentUserObservable.subscribe({
      next: (response: any) => {
        this.token = response;
        if (response) {
          this.isLoggedIn = true;
          this.user = jwt_decode<any>(response).sub;
          this.username = this.user?.fname + ' ' + this.user?.lname;
          this.image = this.user?.image;
          // change profile pic based on gender
          if (!this.image && this.user.gender == 'female') {
            this.image = 'assets/images/images/fa.png';
          } else {
            this.image = 'assets/images/images/ma.png';
          }
        }
      },
    });
  }

  logout() {
    this._AuthService.logout();
  }
}
