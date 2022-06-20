import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {

  transactions:any
  acno:any
  constructor(private ds:DataService) { 

    this.acno=this.ds.currentAcno
    this.transactions=this.ds.getTransaction(this.acno)
    console.log(this.transactions);
    
  }

  ngOnInit(): void {
  }

}
