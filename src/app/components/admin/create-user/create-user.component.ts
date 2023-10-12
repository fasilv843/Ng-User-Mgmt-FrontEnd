import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { hasFormErrors } from '../../../helpers/form.validation.helper';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", Validators.required, Validators.email ],
      password: ["", Validators.required]
    })
  }

  get f(){
    return this.form.controls;
  }

  onSubmit(){
    // const user = this.form.getRawValue()
    this.isSubmitted = true
    // console.log(user,'user details that passed to back end');
    // console.log(this.form.controls,'Form controls');


    if(hasFormErrors(this.form)){
      Swal.fire("Check Inputs",'Enter all input fields fields properly',"warning");
    }else{

      const user = this.form.getRawValue();
      this.http.post('admin/createUser',user,{withCredentials:true}).subscribe(
        () => this.router.navigate(['/admin/usersList']),
        (err)=>{
          Swal.fire("Error",err.error.message,"error");
        }
      )
    }

  }

}
