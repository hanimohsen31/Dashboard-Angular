import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  error: string = '';
  isAdmin = false;

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  ngOnInit(): void {}

  sumbiteForm(data: any) {
    this._AuthService.login(data.value).subscribe({
      next: (response) => {
        // conditions
        if (response.status === 'missingData') {
          this.error = response.message;
        } else if (response.status === 'wrongEmail') {
          this.error = response.message;
        } else if (response.status === 'wrongPassword') {
          this.error = response.message;
        } else if (response.status === 'success') {
          this._AuthService.updateCurrentUser(response.token);
          
          // admin check
          let rule = jwt_decode<any>(response.token)?.sub.rule;
          if (rule === 'admin') {
            this._AuthService.isAdmin.next(true);
            this.isAdmin = true;
          }
          this._Router.navigate(['/dashboard']);
        }
        this._Router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.error = error;
      },
    });
  }
}
