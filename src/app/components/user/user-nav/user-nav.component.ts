import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit, OnDestroy {

  isAuthenticated = false;

  constructor( private http: HttpClient ){}

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.isAuthenticated = auth;
    })
  }

  ngOnDestroy(): void {
    Emitters.authEmitter.unsubscribe()
  }

  logout(){
    this.http.post(`logout`,{},{ withCredentials: true }).subscribe(
      () => this.isAuthenticated = false
    );
  }
  
}
