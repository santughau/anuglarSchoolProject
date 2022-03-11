import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig, DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-batch-create',
  templateUrl: './batch-create.component.html',
  styleUrls: ['./batch-create.component.css']
})
export class BatchCreateComponent implements OnInit {
  bsConfig?: Partial<BsDatepickerConfig>;

  today = new Date()
  selectedDates: DatepickerDateTooltipText[] = [{ date: new Date('2022-08-08'), tooltipText: '8th of August' },
  { date: new Date('2022-08-09'), tooltipText: '9th of August' },
  { date: new Date('2022-08-07'), tooltipText: '7th of August' }
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
