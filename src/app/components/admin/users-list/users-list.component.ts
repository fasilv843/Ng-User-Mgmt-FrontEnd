import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
// import { Emitters } from 'src/app/emitters/emitters';
import { User } from 'src/app/models/user.model';
import { retrieveUsers } from 'src/app/states/user/user.actions';
import { usersSelector } from 'src/app/states/user/user.selectors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  filteredUsers: User[];
  users: User[];
  searchText: string;

  constructor(
    private http: HttpClient,
    private store: Store<{allUsers:User[]}>,
    private router: Router
  ){}
    
  userData$ = this.store.pipe(select(usersSelector));


  ngOnInit(): void {

    this.store.dispatch(retrieveUsers())

    this.userData$.subscribe((data:User[]) => {
      console.log(data);
      
      this.users = data;
      this.filteredUsers = [...data];
    });

  }

  editUser(userId:string){
    this.router.navigate(['/admin/editUser',userId])
  }

  deleteUser(userId:string){
    this.http.post(`admin/deleteUser/${userId}`,{},{withCredentials: true})
    .subscribe(
      () => {
        this.store.dispatch(retrieveUsers())
        Swal.fire('Success',"User Deleted Successfully",'success');
      },
      (err) => {
        this.router.navigate(['/admin'])
      }
    )
  }

  search(): void {

    if (!this.searchText) {
      this.filteredUsers = [...this.users];
      return;
    }
  
    this.filteredUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }


}
