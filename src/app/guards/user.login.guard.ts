import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserLoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {

    console.log('user login guard working');
    

    const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');

    if (isUserLoggedIn) {
        console.log('user already logged in');
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}