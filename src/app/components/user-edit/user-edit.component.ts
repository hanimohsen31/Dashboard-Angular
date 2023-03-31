import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  isAdmin = false;
  error = '';
  id = +this._ActivatedRoute.snapshot.params['id'];

  constructor(
    private _AuthService: AuthService,
    private _UsersService: UsersService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router
  ) {}

  editUserForm = new FormGroup({
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
    gender: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    image: new FormControl(null),
    rule: new FormControl('user'),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  ngOnInit(): void {
    this.isAdmin = this._AuthService.isAdmin.getValue();
    this._UsersService.getUser(this.id).subscribe({
      next: (response) => {
        let obj = response.status[0];
        this.editUserForm.controls['fname'].setValue(obj.fname);
        this.editUserForm.controls['lname'].setValue(obj.lname);
        this.editUserForm.controls['uname'].setValue(obj.uname);
        this.editUserForm.controls['gender'].setValue(obj.gender);
        this.editUserForm.controls['email'].setValue(obj.email);
        this.editUserForm.controls['rule'].setValue(obj.rule);
        this.editUserForm.controls['image'].setValue(obj.image);
        this.editUserForm.controls['password'].setValue(obj.password);
      },
    });
  }

  changeGender(event: any) {
    this.editUserForm?.controls['gender'].setValue(event.target.value);
  }

  sumbiteForm(data: any) {
    this._UsersService.updateUser(this.id, data.value).subscribe({
      next: (response) => {
        let currentToken: any = localStorage.getItem('userToken');
        if (this.id == jwt_decode<any>(currentToken).sub.id) {
          this._AuthService.updateCurrentUser(response.token);
          this._Router.navigate(['/user-profile']);
        } else {
          this._Router.navigate(['/users-list']);
        }
      },
      error: (error) => {
        this.error = error;
      },
    });
  }

  cancel() {
    this._Router.navigate(['/user-profile']);
  }
}
