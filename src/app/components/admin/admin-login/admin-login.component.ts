import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { hasFormErrors } from '../../../helpers/form.validation.helper';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ){}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      email: ['', Validators.required, Validators.email ],
      password: ['', Validators.required ]
    })

    this.http.get('admin/active',{withCredentials:true})
    .subscribe(
      ()=>{
        this.router.navigate(['/admin/dashboard'])
      },
      (err)=>{
        this.router.navigate(['/admin'])
      }
    )

  }

  get f(){
    return this.form.controls;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    // console.log(this.form.controls);
    
    if(hasFormErrors(this.form)){
      Swal.fire("Check Inputs",'Enter all input fields fields properly',"warning");
    }else{
      const admin = this.form.getRawValue();
      console.log(admin);
      
      this.http.post('admin/login',admin,{withCredentials:true}).subscribe(
        () => { 
          localStorage.setItem('isAdminLoggedIn','true');
          this.router.navigate(['/admin/dashboard'])
        },
        (err)=>{
          console.log(err);
          
          Swal.fire("Error",err.error.message,"error");
        }
      )
    }

  }

}
