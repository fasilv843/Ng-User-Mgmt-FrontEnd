import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName = ''

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get('user',{ withCredentials:true })
    .subscribe(
      (res:User) => {
        Emitters.authEmitter.emit(true)
        this.userName = res.name
      },
      (err) => {
        Emitters.authEmitter.emit(false)
      }
    )
  }

}

//////any used in res, remove after project completion
