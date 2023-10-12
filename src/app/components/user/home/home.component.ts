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

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get('user',{ withCredentials:true })
    .subscribe(
      () => {
        Emitters.authEmitter.emit(true)
      },
      (err) => {
        Emitters.authEmitter.emit(false)
      }
    )
  }

}

