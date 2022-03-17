import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';

export function areMatched(password: string, confirmPassword: string){
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[password];
    const matchingControl = formGroup.controls[confirmPassword];

    if (matchingControl.errors && !matchingControl.errors.areMatched) {
        return;
    }
    if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ areMatched: true });
    } else {
        matchingControl.setErrors(null);
    }
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  formRef : FormGroup | any;
  submitStatus=false;

  get firstName(){
    return this.formRef.get('firstName');
  }
  get lastName(){
    return this.formRef.get('lastName');
  }
  get username(){
    return this.formRef.get('username');
  }
  get emailId(){
    return this.formRef.get('emailId');
  }
  get mobile(){
    return this.formRef.get('mobile');
  }
  get school(){
    return this.formRef.get('school');
  }
  get password(){
    return this.formRef.get('password');
  }
  get cpassword(){
    return this.formRef.get('cpassword');
  }
  get acceptTerms(){
    return this.formRef.get('acceptTerms');
  }
  
  // Inject User Service Object
  constructor(private us:UserServiceService, private router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.formRef = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.maxLength(10)]],
      emailId: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
      school:['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', Validators.required],
      acceptTerms:['',Validators.requiredTrue]
    },{
      validator: areMatched('password', 'cpassword')
    });
  }
  onSubmit(formRef:{value:any}){
    if (this.formRef.invalid) {
      this.submitStatus=true;
      return;
    }
    let userObj = formRef;
    console.log(userObj);
    // Send userObj to UserService
    this.us.createUser(userObj).subscribe(
      res=>{
        alert(res["message"]);
        if(res["message"]=="Account created successfully !!"){
          this.router.navigateByUrl("/login");
        }
      },
      err=>{
        alert("Something went wrong in account creation!!");
        console.log("Error in account creation ",err);
      }
    )
  }

}