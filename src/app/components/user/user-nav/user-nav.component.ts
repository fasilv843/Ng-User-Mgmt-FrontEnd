import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit, OnDestroy {

  isAuthenticated = false

  constructor( 
    private http: HttpClient,
  ){}

  ngOnInit(): void {
    console.log('OnInit Invoked');
    
    Emitters.authEmitter.subscribe((auth: boolean) => {
      console.log(auth, 'auth from ngOnInit of event subscription');
      this.isAuthenticated = auth;
    });
  }

  ngOnDestroy(): void {
    console.log('OnDestroy Invoked');
  }

  logout(){
    this.http.post(`user/logout`,{},{ withCredentials: true }).subscribe(
      () => {
        localStorage.removeItem('isUserLoggedIn');
        this.isAuthenticated = false
      }
    );
  }

}
