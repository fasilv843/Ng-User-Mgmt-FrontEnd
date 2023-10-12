import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { SweetAlert2LoaderService } from '@sweetalert2/ngx-sweetalert2';
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
    private router: Router,
    private sweetAlertService: SweetAlert2LoaderService
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

  confirmDelete(userId:string){

    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      
    }).then((result) => {
      if (result.isConfirmed) {

        this.http.post(`admin/deleteUser/${userId}`,{},{withCredentials: true})
        .subscribe(
          () => {
            this.store.dispatch(retrieveUsers())
          },
          (err) => {
            this.router.navigate(['/admin'])
          }
        )

        Swal.fire(
          'Deleted!',
          'User has been deleted.',
          'success'
        );

      }
    });


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
