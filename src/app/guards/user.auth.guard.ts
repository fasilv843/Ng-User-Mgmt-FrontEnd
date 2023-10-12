import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserAuthGuardComponent implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');

    console.log(isUserLoggedIn,'isUserLoggedIn');
    
    if(!isUserLoggedIn){
        this.router.navigate(['/'])
        return false;
    }

    return true;
  }
}