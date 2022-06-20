import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user:any
  lDate:any
  acno=""
  // acno = ""
  // passw = ""
  // amount = ""

  // acno1 = ""
  // passw1 = ""
  // amount1 = ""
  
  depositForm=this.fb.group({
    acno : ["",[Validators.required,Validators.pattern("[0-9]*")]],
    passw : ["",[Validators.required,Validators.pattern("[a-zA-Z0-9]*")]],
    amount : ["",[Validators.required,Validators.pattern("[0-9]*")]]
  
  })

  withdrawForm=this.fb.group({
    acno1 : ["",[Validators.required,Validators.pattern("[0-9]*")]],
    passw1 : ["",[Validators.required,Validators.pattern("[a-zA-Z0-9]*")]],
    amount1 : ["",[Validators.required,Validators.pattern("[0-9]*")]]
  
  })

  

  constructor(private ds: DataService,private fb:FormBuilder,private router:Router) { 
    this.user=this.ds.currentUname
    this.lDate=new Date()
  }

  ngOnInit(): void {
    if(!localStorage.getItem("currentAcno")){
      alert("please login")
      this.router.navigateByUrl("")
    }
  }

  deposit() {
    var acno = this.depositForm.value.acno
    var passw = this.depositForm.value.passw
    var amount = this.depositForm.value.amount
    if(this.depositForm.valid){
      const result = this.ds.deposit(acno, passw, amount)
      if (result) {
        alert(`${amount} has been credited to your account and your account balance is ${result}`)
      }
      else{
        alert("invalid form")
      }
      
    }
    
  }

  withdraw() {
    var acno = this.withdrawForm.value.acno1
    var passw = this.withdrawForm.value.passw1
    var amount = this.withdrawForm.value.amount1
    if(this.withdrawForm.valid){
      const result = this.ds.withdraw(acno, passw, amount)
      if (result) {
        alert(`${amount} has been debited from your account and your account balance is ${result}`)
      }
      else{
        alert("invalid form")
      }
    }
    
  }

  logout(){
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("currentUname")
    this.router.navigateByUrl("")
  }

  deleteMyAccount(){
    this.acno=JSON.parse(localStorage.getItem("currentAcno")||"")
  }

  cancel(){
    this.acno=""
  }

  delete(event:any){
    alert(`delete account ${event} from parent`)
    this.router.navigateByUrl("")
  }
}
