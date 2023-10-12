import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Emitters } from 'src/app/emitters/emitters';
import Swal from 'sweetalert2';
import { hasFormErrors } from '../../../helpers/form.validation.helper';
// import * as AuthActions from 'src/app/states/auth/auth.actions';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder:FormBuilder,
    private http: HttpClient,
    private router: Router,
    private store: Store
  ){}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      email:['', Validators.required, Validators.email ],
      password:['', Validators.required]
    })

    this.http.get('user',{withCredentials:true})
    .subscribe(
      (res:any) => {
        this.router.navigate(['/'])
        Emitters.authEmitter.emit(true)
      },
      (err) => {
        this.router.navigate(['/login']);
        Emitters.authEmitter.emit(false)
      }
    );

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
      const user = this.form.getRawValue();
      this.http.post('user/login',user,{withCredentials:true}).subscribe(
        () => {
          localStorage.setItem('isUserLoggedIn','true');
          this.router.navigate(['/']);
        },
        (err)=>{
          Swal.fire("Error",err.error.message,"error");
        }
      )
    }

  }

}
