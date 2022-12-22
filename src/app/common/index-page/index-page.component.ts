/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {
  students = [];
  expensesList = [];
  totalFee;
  collectedFee;
  totlaExpenses;

  constructor(public appService: SharedServiceService, private router: Router,) { 
   
  }

  ngOnInit(): void {
    this.getStudentData();
    this.getFeeData();
    this.getTotalExpenseData();
    this.getExpenseItem();
    
  }

  getStudentData() {
    this.appService.showSpinner();
    this.appService.getMethod('index/class.php').subscribe((data) => {
      this.students = data.document;
      console.log(this.students);
      this.appService.hideSpinner();
    });
  }

  getFeeData() {
    this.appService.showSpinner();
    this.appService.getMethod('index/fee.php').subscribe((data) => {
      this.totalFee = data.totalFee;
      this.collectedFee = data.collectedFee;
      console.log(data);
      this.appService.hideSpinner();
    });
  }

  getTotalExpenseData() {
    this.appService.showSpinner();
    this.appService.getMethod('index/balance.php').subscribe((data) => {
      this.totlaExpenses = data.totalExpenses;
      console.log(this.totlaExpenses);
      this.appService.hideSpinner();
    });
  }

  getExpenseItem() {
    this.appService.showSpinner();
    this.appService.getMethod('expense/read.php').subscribe((data) => {
      this.expensesList = data.document;
      console.log(this.expensesList);
      this.appService.hideSpinner();
    });
  }

}
