import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitters';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {
  // isAuthenticated = false

  constructor(
    private http: HttpClient,
    private router: Router
  ){}

  ngOnInit(): void {
    // Emitters.authEmitter.subscribe( (auth: boolean) => {
    //   this.isAuthenticated = auth
    // })
  }

  onLogout(){
    this.http.post('admin/logout',{},{ withCredentials:true }).subscribe(
      () => {
        localStorage.removeItem('isAdminLoggedIn')
        this.router.navigate(['/admin'])
      }
    );
  }
  
}
