import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsDatepickerConfig, DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Expences } from '../expences.model';
import { ExpencesService } from '../expences.service';

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
  constructor(private router: Router, private service: ExpencesService,private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD-MM-YYYY, h:mm:ss a', containerClass: 'theme-red', showWeekNumbers: false, showTodayButton: true, showClearButton: true, withTimepicker: true, initCurrentTime: true, customTodayClass: 'today' });
  }

  saveExpense() {
    const data = {
      'expencesParticular' : this.expences.expencesParticular,
      'expencesAmt' : this.expences.expencesAmt,
      'expencesDate' : this.expences.expencesDate
    }
    this.service.createExpense(data).subscribe((res) => {
      this.toastr.success('Expense Created Successfully!', 'Weldone!', {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: 'decreasing',
        closeButton: true,     
      });
      this.router.navigate(['/expences/expencesList']);
    }); 
  }

}
