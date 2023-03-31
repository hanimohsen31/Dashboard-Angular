import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth.guard';
// components
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
// pages
// import { HomePageComponent } from './pages/home-page/home-page.component';
// import { UserEditPageComponent } from './pages/user-edit-page/user-edit-page.component';
// import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';
// import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
// import { AddNewPageComponent } from './pages/add-new-page/add-new-page.component';

const routes: Routes = [
  { path: 'users-list', component: HomeComponent , canActivate: [AuthGuard] },
  { path: 'user-edit/:id', component: UserEditComponent , canActivate: [AuthGuard] },
  { path: 'user-profile', component: UserProfileComponent , canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard] },
  { path: 'add-new', component: RegisterComponent , canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component:NotFoundComponent },
];

// const routes: Routes = [
//   {path: 'users-list',component: HomePageComponent, canActivate: [AuthGuard],},
//   {path: 'user-edit/:id',component: UserEditPageComponent,canActivate: [AuthGuard],},
//   {path: 'user-profile',component: UserProfilePageComponent,canActivate: [AuthGuard],},
//   {path: 'dashboard',component: DashboardPageComponent,canActivate: [AuthGuard],},
//   { path: 'add-new', component: AddNewPageComponent, canActivate: [AuthGuard] },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//   { path: '**', component: NotFoundComponent },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
