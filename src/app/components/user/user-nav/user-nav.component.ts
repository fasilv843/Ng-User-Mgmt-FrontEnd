import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Store } from '@ngrx/store';
import { Emitters } from 'src/app/emitters/emitters';
// import * as AuthActions from 'src/app/states/auth/auth.actions';
// import { Observable } from 'rxjs'

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit, OnDestroy {

  isAuthenticated = false

  constructor( 
    private http: HttpClient,
    // private store: Store
  ){}

  ngOnInit(): void {
    console.log('OnInit Invoked');
    
    Emitters.authEmitter.subscribe((auth: boolean) => {
      console.log(auth, 'auth from ngOnInit of event subscription');
      this.isAuthenticated = auth;
    });
    // this.isAuthenticated = this.store.select(isAuthenticated);
    // this.isAuthenticated.subscribe((auth:boolean) => {
    //   this.isAuthenticated = auth
    // })
  }

  ngOnDestroy(): void {
    console.log('OnDestroy Invoked');
    
    // Emitters.authEmitter.unsubscribe()
    // this.isAuthenticated.
  }

  logout(){
    this.http.post(`user/logout`,{},{ withCredentials: true }).subscribe(
      () => this.isAuthenticated = false
      // () => this.store.dispatch(AuthActions.logout())
    );
    // this.isAuthenticated = false
  }

}
