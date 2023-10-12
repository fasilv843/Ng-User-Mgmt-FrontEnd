import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitters';
import { User } from 'src/app/models/user.model';
import { Store, select } from '@ngrx/store'
import Swal from 'sweetalert2';
import { retrieveProfile } from 'src/app/states/user/user.actions';
import { userProfileSelector } from 'src/app/states/user/user.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  form: FormGroup;

  public name: string;
  public email: string;
  img: string;
  selectedFile: File;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<{userDetails:User}>
  ){}

  userData$ = this.store.pipe(select(userProfileSelector)).subscribe( profileData => {
    this.name = profileData.name;
    this.email = profileData.email;
    this.img = profileData?.image;
    console.log(profileData,'profileData');
    
  })

  ngAfterViewInit(): void {
    Emitters.authEmitter.emit(true)
  }

  ngOnInit(): void {
    this.store.dispatch(retrieveProfile());
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('image',this.selectedFile,this.selectedFile.name)

    this.http.post(`user/profile-upload-single`,formData,{ withCredentials: true })
    .subscribe(
      () => {
        Emitters.authEmitter.emit(true);
        this.store.dispatch(retrieveProfile());
        Swal.fire('Success','Saved','success')
      },
      (err) => {
        Swal.fire("Error",err.error.message,'error');
      }
    )
  }

  // onFileSelected(event:Event){
  //   this.selectedFile = <File>event.target.files[0];
  //   console.log(event);
  // }
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
  
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
      console.log(this.selectedFile);
    }
  }
  

}
