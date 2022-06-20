import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  aim = "Your Perfect Banking Partner"
  accno = "Enter Your Account Number"
  pswd = "Enter Your Password"
  // acno = ""
  // passw = ""
  database: any = {
    1000: { acno: 1000, uname: "Neer", password: 1000, balance: 5000 },
    1001: { acno: 1001, uname: "Vyom", password: 1001, balance: 5000 },
    1002: { acno: 1002, uname: "Laisha", password: 1002, balance: 5000 }
  }

  loginForm=this.fb.group({
    acno:["",[Validators.required,Validators.pattern("[0-9]*")]],
    passw:["",[Validators.required,Validators.pattern("[a-zA-Z0-9]*")]]
  })

  constructor(private routerLogin: Router, private ds: DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  // acno change

  // acnoChange(event:any){
  //   this.acno=event.target.value
  //   console.log(this.acno);

  // }
  // pswd change

  // passChange(event:any){
  //   this.passw=event.target.value
  //   console.log(this.passw);

  // }
  // template reference variable

  // login(a:any,p:any){
  //   var acno=a.value
  //   var passW=p.value
  //   let database=this.database
  //   if(acno in database){
  //     if(passW==database[acno].password){
  //       alert("login success")
  //     }
  //     else{
  //       alert("incorrect password")
  //     }
  //   }
  //   else{
  //     alert("invalid account number or user does not exist")
  //   }
  // }
  login() {
    console.log(this.loginForm);
    
    var acno = this.loginForm.value.acno
    var passw = this.loginForm.value.passw

    if(this.loginForm.valid){
      const result = this.ds.login(acno, passw)

      if (result) {
        alert("login successful")
        this.routerLogin.navigateByUrl("dashboard")
      }
      else{
        alert("invalid form")
      }
    }
    
  }
}
