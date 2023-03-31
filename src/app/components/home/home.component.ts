import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from './../../services/users.service';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/services/auth.service';

export interface UserData {
  id: number;
  uname: string;
  fname: string;
  lname: string;
  email: string;
  rule: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'uname',
    'fname',
    'email',
    'rule',
    'action',
  ];
  dataSource!: MatTableDataSource<UserData>;
  users: UserData[] = [];
  isAdmin: any = false;
  tableRows: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _UsersService: UsersService,
    private _Router: Router,
    private _AuthService: AuthService
  ) {}

  ngOnInit(): void {
    // get data from backend
    this._UsersService.getusers().subscribe({
      next: (response) => {
        this.users = response.users;
        this.dataSource = new MatTableDataSource(response.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
    this.isAdmin = this._AuthService.isAdmin.getValue();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  userEdit(id: any) {
    this._Router.navigate(['/user-edit', id]);
  }

  deleteUser(id: any, index: number) {
    this._UsersService.deleteUser(id).subscribe({
      next: (response) => {
        this.tableRows[index] = !this.tableRows[index];
      },
    });
  }
}
