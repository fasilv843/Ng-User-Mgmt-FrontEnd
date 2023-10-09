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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TransformUrlInterceptor } from './interceptors/transform-url.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userEffects } from './states/user/user.effects';
import { postReducer, profileReducer } from './states/user/user.reduce';
import { UsersListComponent } from './components/admin/users-list/users-list.component';
import { EditUserComponent } from './components/admin/edit-user/edit-user.component';
import { CreateUserComponent } from './components/admin/create-user/create-user.component';
import { AdminRoutingModule } from './components/admin/admin-login/admin.routing';

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
    DashboardComponent,
    UsersListComponent,
    EditUserComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      userDetails:profileReducer,
      allUsers: postReducer
    }),
    EffectsModule.forRoot([userEffects])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TransformUrlInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
