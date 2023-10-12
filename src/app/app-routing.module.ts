import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/user/home/home.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { UserAuthGuardComponent } from './guards/user.auth.guard';
import { UserLoginGuard } from './guards/user.login.guard';
// import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
// import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';

const routes: Routes = [
  {
    path: 'user/login', 
    component: UserLoginComponent,
    canActivate: [UserLoginGuard]
  },
  {
    path: 'user/register', 
    component: RegisterComponent,
    canActivate: [UserLoginGuard]
  },
  {
    path: 'home', 
    component: HomeComponent
  },
  {
    path: 'user/profile', 
    component: ProfileComponent,
    canActivate: [UserAuthGuardComponent]
  },
  {
    path: '', 
    redirectTo:'home', 
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
