import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { hasFormErrors } from '../../../helpers/form.validation.helper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  isSubmitted = false

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required ],
      email: ['', Validators.required, Validators.email ],
      password:['', Validators.required ]
    })
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
      this.http.post('user/register',user,{withCredentials:true}).subscribe(
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
