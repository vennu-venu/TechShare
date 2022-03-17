import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  // Inject HTTP Client Object
  constructor(private hc:HttpClient) { }
  createUser(userObj:{value:any}):Observable<any>{
    return this.hc.post("/register/create",userObj);
  }
  checkUser(userCredentialObj:{value:any}):Observable<any>{
    return this.hc.post("/login/check",userCredentialObj);
  }
}
