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
import { BsDatepickerConfig, DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
import { Expences } from '../expences.model';
@Component({
  selector: 'app-expences-create',
  templateUrl: './expences-create.component.html',
  styleUrls: ['./expences-create.component.css']
})
export class ExpencesCreateComponent implements OnInit {
  expences: Expences = {
    expencesId: '',
    expencesParticular: '',
    expencesAmt: '',
    expencesDate: new Date('Aug 22 2022 08:58:02 GMT+0530')
  }
  bsConfig?: Partial<BsDatepickerConfig>;

  today = new Date()
  selectedDates: DatepickerDateTooltipText[] = [{ date: new Date('2022-03-08'), tooltipText: 'Present' },
  { date: new Date('2022-03-09'), tooltipText: 'Absent' },
  { date: new Date('2022-03-07'), tooltipText: 'Present' }
  ];

  disabledDates = [
    new Date('2022-03-05'),
    new Date('2022-03-09')
  ];
  constructor(private router: Router, public appService: SharedServiceService) { }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD-MM-YYYY, h:mm:ss a', containerClass: 'theme-red', showWeekNumbers: false, showTodayButton: true, showClearButton: true, withTimepicker: true, initCurrentTime: true, customTodayClass: 'today' });
  }

  saveExpense() {
    const data = {
      'expencesParticular' : this.expences.expencesParticular,
      'expencesAmt' : this.expences.expencesAmt,
      'expencesDate' : this.expences.expencesDate
    }
    this.appService.postMethod('expense/create.php',data).subscribe((res) => {
      this.appService.successMsg('Expenses Created Successfully !', 'Weldone !');
      this.router.navigate(['/expences/expencesList']);
    }); 
  }
}
