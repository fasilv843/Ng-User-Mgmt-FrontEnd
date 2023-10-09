import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Emitters } from 'src/app/emitters/emitters';
import Swal from 'sweetalert2';
// import * as AuthActions from 'src/app/states/auth/auth.actions';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private http: HttpClient,
    private router: Router,
    private store: Store
  ){}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      email:'',
      password:''
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

  ValidateEmail = (email: string) => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex)) {  
      return true;
    } else {
      return false;
    }
  }

  onSubmit(){
    const user = this.form.getRawValue()
    console.log(user);

    if(user.email == '' || user.password == ''){
      Swal.fire("Error","Please enter all the fields",'error')
    }else if(!this.ValidateEmail(user.email)){
      Swal.fire("Error","Please Enter a valid email",'error')
    }else{
      this.http.post('user/login',user, {withCredentials:true})
      .subscribe(
        (res) =>{ 
          // this.store.dispatch(AuthActions.loginSuccess())
          this.router.navigate(['/'])
        },
        (err) => Swal.fire("Error",err.error.message,"error")
      )
    }
    
  }

}
