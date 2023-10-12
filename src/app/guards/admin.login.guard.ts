import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminLoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {

    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');

    if (isAdminLoggedIn) {
      this.router.navigate(['/admin/dashboard']);
      return false;
    }

    return true;
  }
}