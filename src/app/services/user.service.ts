import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  laodUsers(){
    return this.http.get('admin/usersList',{ withCredentials: true });
  }

  loadProfile(){
    return this.http.get('user/profile',{ withCredentials: true });
  }
}
