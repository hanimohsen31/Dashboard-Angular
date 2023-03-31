import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'admin-dashboard';

  isLoggedin: any = false;
  subscription: Subscription;
  constructor(private _AuthService: AuthService) {
    this.subscription = this._AuthService.isLoggedinObservable.subscribe({
      next: (response: any) => {
        // console.log(response)
        this.isLoggedin = response;
      },
    });
  }
}
