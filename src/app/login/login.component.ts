import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private us:UserServiceService,private route:Router) { }

  ngOnInit(): void {
  }

  onSubmit(formRef:{value:any}){
    let userCredentialObj = formRef;
    this.us.checkUser(userCredentialObj).subscribe(
      res=>{
        alert(res["message"]);
        if(res["message"]=="Login success !!"){
          // Storing jwt web token in Browser Memory
          localStorage.setItem("token",res["jwt"]);
          localStorage.setItem("user",JSON.stringify(res["userObj"]));
          // Navigate to another component
          this.route.navigateByUrl("/usermain");
        }
      },
      err=>{
        alert("Someting went wrong in Login");
        console.log("Error in login ",err);
      }
    )
  }
}
