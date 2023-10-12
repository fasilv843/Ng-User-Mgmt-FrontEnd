import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuardComponent implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {

    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
    console.log(isAdminLoggedIn,'isAdminLoggedIn');

    if (!isAdminLoggedIn) {
      this.router.navigate(['/admin']);
      return false;
    }

    return true;
  }
}