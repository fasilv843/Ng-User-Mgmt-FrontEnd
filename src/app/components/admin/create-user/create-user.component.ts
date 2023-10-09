import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  form: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: "",
      email: "",
      password: ""
    })
  }

  validateEmail = (email: string) => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit(){
    const user = this.form.getRawValue()
    console.log(user,'user details that passed to back end');
    
    if(user.name == "" || user.email == "" || user.password == "") {
      Swal.fire("Error","Please enter all fields","error")
    }else if(!this.validateEmail(user.email)){
      Swal.fire("Error","Please enter a valid email","error");
    }else{
      this.http.post('admin/createUser',user,{ withCredentials:true })
      .subscribe(
        () =>{ 
          this.router.navigate(['admin/usersList'])
          Swal.fire("Added","New User added successfully","success");
        },
        (err) => {
          console.log(err);
          
          Swal.fire("Error",err.error.message,"error");
        }
      )
    }
  }

}
