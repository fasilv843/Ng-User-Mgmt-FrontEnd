import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserNavComponent } from './components/user/user-nav/user-nav.component';
import { AdminNavComponent } from './components/admin/admin-nav/admin-nav.component';
import { RegisterComponent } from './components/user/register/register.component';
import { HomeComponent } from './components/user/home/home.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    UserNavComponent,
    AdminNavComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    AdminLoginComponent,
    UserLoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
