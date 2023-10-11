import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardComponent implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');

    if (isAdminLoggedIn) {
      // User or admin is already logged in
      // Redirect them to the home page or any other appropriate route
      this.router.navigate(['/admin']); // Change this to the appropriate route
      return false;
    }

    if(isUserLoggedIn){
        this.router.navigate(['/'])
        return false;
    }

    return true;
  }
}