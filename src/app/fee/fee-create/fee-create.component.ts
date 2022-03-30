import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsDatepickerConfig, DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';
import { Fee } from '../fee.model';
import { FeeService } from '../fee.service';

@Component({
  selector: 'app-fee-create',
  templateUrl: './fee-create.component.html',
  styleUrls: ['./fee-create.component.css']
})
export class FeeCreateComponent implements OnInit {
  fee: Fee = {
    feeId: '',
    feeClass: '',
    feeBatch: '',
    feeStudentName: '',
    feeFeeAmt: '',
    feeVoucherNo: '',
    feeDate: ''
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
  constructor(private router: Router, private service: FeeService) { }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-red', showWeekNumbers: false, showTodayButton: true, showClearButton: true, withTimepicker: true, initCurrentTime: true, customTodayClass: 'today' });
  }

}
