import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usermain',
  templateUrl: './usermain.component.html',
  styleUrls: ['./usermain.component.css']
})
export class UsermainComponent implements OnInit {

  constructor(private route:Router) { }
  userObj:any;
  ngOnInit(): void {
    // Get username from Local Storage
    let s = localStorage.getItem("user")+"";
    this.userObj = JSON.parse(s);
  }

  logOut(){
    // Clearing Local Storage
    localStorage.clear();
    this.route.navigateByUrl("/home");
  }
}
