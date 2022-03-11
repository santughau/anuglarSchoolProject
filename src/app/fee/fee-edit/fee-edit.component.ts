import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig, DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-fee-edit',
  templateUrl: './fee-edit.component.html',
  styleUrls: ['./fee-edit.component.css']
})
export class FeeEditComponent implements OnInit {

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
  constructor() { }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-red', showWeekNumbers: false, showTodayButton:true,showClearButton: true,withTimepicker:true,initCurrentTime:true,customTodayClass:'today'});
  }

}
