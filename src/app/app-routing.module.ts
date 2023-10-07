import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/user/home/home.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';

const routes: Routes = [
  {path: 'user/login', component: UserLoginComponent},
  {path: 'user/register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '', redirectTo:'home', pathMatch:'full'},

  {path: 'admin/login', component: AdminLoginComponent},
  {path: 'admin/dashboard', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
