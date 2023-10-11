import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';
import { hasFormErrors } from '../../helpers/form.validation.helper';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userName: string;
  email: string;
  form: FormGroup;
  isSubmitted = false;

  constructor(
    private http:HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  public param: string;

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      name: [this.userName, Validators.required]
    });

    this.activatedRoute.params.subscribe(params => this.param = params['id']);

    this.http.get(`admin/active`,{ withCredentials: true }).subscribe(
      (res:User) => this.getUserDetails(this.param),
      (err) => this.router.navigate(['/admin'])
    );
  }

  get f(){
    return this.form.controls;
  }


  onSubmit(){
    this.isSubmitted = true;
    const user = this.form.getRawValue();
    user.email = this.email;

    if(hasFormErrors(this.form)){
      Swal.fire("Check Inputs",'Name Remain Unchanged or Name Removed',"warning");
    }else{

      this.http.post('admin/editUser',user,{withCredentials:true}).subscribe(
        ()=>this.router.navigate(['/admin/usersList']),
        (err)=>{
          Swal.fire("Error",err.error.message,"error");
        }
      )
    }


  }

  getUserDetails(userId:string){
    this.http.post(`admin/userDetails/${userId}`,{},{ withCredentials:true })
    .subscribe(
      (res:User) => {
        this.userName = res.name
        this.email = res.email
      },
      (err) => {
        this.router.navigate(['/admin'])
      }
    )
  }

}
