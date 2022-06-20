import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentUname: any
  currentAcno: any
  database: any = {
    1000: { acno: 1000, uname: "Neer", password: 1000, balance: 5000, transactions: [] },
    1001: { acno: 1001, uname: "Vyom", password: 1001, balance: 5000, transactions: [] },
    1002: { acno: 1002, uname: "Laisha", password: 1002, balance: 5000, transactions: [] }
  }

  constructor() { this.getData()}

  storeData(){
    localStorage.setItem("database",JSON.stringify(this.database))
    if(this.currentAcno){
      localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
    }
    if(this.currentUname){
      localStorage.setItem("currentUname",JSON.stringify(this.currentUname))
    }

  }

  getData(){
    if(localStorage.getItem("database")){
      this.database=JSON.parse(localStorage.getItem("database")||"")
    }
    if(localStorage.getItem("currentAcno")){
      this.currentAcno=JSON.parse(localStorage.getItem("currentAcno")||"")
    }
    if(localStorage.getItem("currentUname")){
      this.currentUname=JSON.parse(localStorage.getItem("currentUname")||"")
    }

  }

  register(acno: any, password: any, uname: any) {
    let database = this.database

    if (acno in database) {
      return false
    }
    else {
      database[acno] = {
        acno,
        uname,
        password,
        balance: 0,
        transactions: []
      }
      console.log(database);
      this.storeData()
      return true
    }
  }

  login(acno: any, password: any) {
    let database = this.database
    if (acno in database) {
      if (password == database[acno].password) {
        this.currentAcno = acno
        this.currentUname = database[acno].uname
        this.storeData()
        return true
      }
      else {
        return false
      }
    }
    else {
      return false
    }
  }

  deposit(acno: any, password: any, amt: any) {
    var amount = parseInt(amt)
    let database = this.database
    if (acno in database) {
      if (password == database[acno]["password"]) {
        database[acno]["balance"] += amount
        database[acno]["transactions"].push({
          amount: amount,
          type: "Credit"
        })
        this.storeData()
        return database[acno]["balance"]
      }
      else {
        alert("incorrect password")
        return false
      }
    }
    else {
      alert("user does not exist")
      return false
    }
  }

  withdraw(acno: any, password: any, amt: any) {
    var amount = parseInt(amt)
    let database = this.database
    if (acno in database) {
      if (password == database[acno]["password"]) {
        if (database[acno]["balance"] >= amount) {
          database[acno]["balance"] -= amount
          database[acno]["transactions"].push({
            amount: amount,
            type: "Debit"
          })
          this.storeData()
          return database[acno]["balance"]
        }
        else {
          alert("insufficient balance")
        }
      }
      else {
        alert("incorrect password")
        return false
      }
    }
    else {
      alert("user does not exist")
      return false
    }
  }

  getTransaction(acno: any) {
    return this.database[acno]["transactions"]
  }

}


