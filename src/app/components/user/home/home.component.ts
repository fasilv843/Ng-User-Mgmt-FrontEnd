import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName = 'Sample User'

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get('user',{ withCredentials:true })
    .subscribe(
      (res:any) => {
        Emitters.authEmitter.emit(true)
      },
      (err) => {
        Emitters.authEmitter.emit(false)
      }
    )
  }

}

//////any used in res, remove after project completion
