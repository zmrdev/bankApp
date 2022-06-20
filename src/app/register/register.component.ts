import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // uname = ""
  // acno = ""
  // passw = ""


  registerForm=this.fb.group({
    acno:["",[Validators.required,Validators.pattern("[0-9]*")]],
    passw:["",[Validators.required,Validators.pattern("[a-zA-Z0-9]*")]],
    uname:["",[Validators.required,Validators.pattern("[a-zA-Z ]*")]]
  })

  

  constructor(private ds: DataService,private router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  register() {
    console.log(this.registerForm);
    
    var uname = this.registerForm.value.uname
    var acno = this.registerForm.value.acno
    var passw = this.registerForm.value.passw

    
    if(this.registerForm.valid){
      const result = this.ds.register(acno, passw, uname)

      if(result){
        alert("successfully registered")
        this.router.navigateByUrl("")
      }
      else{
        alert("user already exists..please login")
      }
    }
    else{
      alert("invalid form")
    }
    
  }

}
