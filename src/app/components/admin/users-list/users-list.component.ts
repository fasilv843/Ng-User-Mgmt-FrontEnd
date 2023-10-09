import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Emitters } from 'src/app/emitters/emitters';
import { User } from 'src/app/models/user.model';
import { retrievePost } from 'src/app/states/user/user.actions';
import { uniqueEmail } from 'src/app/states/user/user.selectors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private store: Store<{allUsers:User[]}>,
    private router: Router
  ){}

  userData$ = this.store.pipe(select(uniqueEmail));


  ngOnInit(): void {
    this.http.get('admin/usersList',{ withCredentials: true })
    .subscribe(
      (data) => {
        console.log(data);
        this.store.dispatch(retrievePost())
      },
      (err) => {
        console.log(err,'error while fetching users list');
        this.router.navigate(['/admin']);
      }
    )
  }

  editUser(userId:string){
    this.router.navigate(['/admin/editUser',userId])
  }

  deleteUser(userId:string){
    this.http.post(`admin/deleteUser/${userId}`,{},{withCredentials: true})
    .subscribe(
      () => {
        this.store.dispatch(retrievePost())
        Swal.fire('Success',"User Deleted Successfully",'success');
      },
      (err) => {
        this.router.navigate(['/admin'])
      }
    )
  }
}
