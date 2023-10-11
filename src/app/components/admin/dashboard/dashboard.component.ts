import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Emitters } from 'src/app/emitters/emitters';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  adminName : string;

  constructor(private http: HttpClient, private router: Router){}

  ngOnInit(): void {
    this.http.get('admin/active',{ withCredentials: true })
    .subscribe(
      (res : User) => {
        // Emitters.authEmitter.emit(true)
        this.adminName = res.name;
      },
      (err) => this.router.navigate(['/admin'])
    )
  }
}
