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
import { Router ,ActivatedRoute} from '@angular/router';
import { BsDatepickerConfig, DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
import { Expences } from '../expences.model';

@Component({
  selector: 'app-expences-edit',
  templateUrl: './expences-edit.component.html',
  styleUrls: ['./expences-edit.component.css']
})
export class ExpencesEditComponent implements OnInit {
  expencesId: any;
  expences: Expences = {
    expencesId: '',
    expencesParticular: '',
    expencesAmt: '',
    expencesDate: ''
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
  constructor(private router : Router, private _route: ActivatedRoute,public appService: SharedServiceService) { }

  ngOnInit(): void {
    this.appService.showSpinner();
    this.expencesId = this._route.snapshot.paramMap.get('id');
    console.log("expencesId = " + this.expencesId);
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD-MM-YYYY, h:mm:ss a', containerClass: 'theme-red', showWeekNumbers: false, showTodayButton: true, showClearButton: true, withTimepicker: true, initCurrentTime: true, customTodayClass: 'today' });

    this.appService.getMethod('expense/read_one.php?id=' + this.expencesId).subscribe((data) => {
      this.expences = data.document;
      console.log(this.expences);
      this.appService.hideSpinner();
    });
  }

  updateExpense(){
    console.log(this.expences);
    this.appService.showSpinner();
    this.appService.postMethod('expense/update.php', this.expences).subscribe(res => {
      if (res.status == 'success') {
        this.appService.successMsg('Expenses Updated Successfully !', 'Weldone !');
        this.router.navigate(['/expences/expencesList'])
      } else {
        this.appService.errorsMsg('Expenses not  Updated Successfully !', 'Weldone !');
      }
    });
  }
}
