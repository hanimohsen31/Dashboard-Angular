import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { Subscription } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any;
  subscription: Subscription;

  constructor(
    private _AuthService: AuthService,
    private _UsersService: UsersService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this._AuthService.currentUserObservable.subscribe({
      next: (response: any) => {
        this.user = jwt_decode<any>(response).sub;
        if (response) {
          // change profile pic based on gender
          if (!this.user.image && this.user.gender == 'female') {
            this.user.image = 'assets/images/images/fa.png';
          } else {
            this.user.image = 'assets/images/images/ma.png';
          }
        }
      },
    });
  }

  editProfile() {
    this._Router.navigate(['/user-edit', this.user.id]);
  }
}
