import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _ActiveRoute: ActivatedRoute
  ) {}

  error: string = '';
  isLoggedin = false;
  subscription: Subscription;

  registerForm = new FormGroup({
    fname: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    lname: new FormControl(null, [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(3),
    ]),
    uname: new FormControl(null, [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(3),
    ]),
    gender: new FormControl('user', [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    image: new FormControl(null),
    rule: new FormControl('user', [Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
    ]),
    cPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  ngOnInit(): void {
    this.subscription = this._AuthService.isLoggedinObservable.subscribe({
      next: (response: any) => {
        console.log("response register class loggeedin: " , response)
        this.isLoggedin = response
      },
    });
  }

  sumbiteForm(data: any) {
    this._AuthService.register(data.value).subscribe({
      next: (response) => {
        // check register data
        if (response.status === 'repeatedEmail') {
          this.error = response.message;
        } else if (response.status === 'repeatedUname') {
          this.error = response.message;
        } else if (response.status === 'missingData') {
          this.error = response.message;
        } else if (response.status === 'success') {
          // check if add-new route
          if (this._ActiveRoute.snapshot.url[0]['path'] == 'add-new') {
            this._Router.navigate(['/users-list']);
          } else {
            this._Router.navigate(['/login']);
          }
        }
      },
      error: (error) => {
        console.log(error);
        this.error = error;
      },
    });
  }
}
