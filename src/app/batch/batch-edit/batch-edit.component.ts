import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsDatepickerConfig, DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';
import { Batch } from '../batch.model';
import { BatchService } from '../batch.service';
@Component({
  selector: 'app-batch-edit',
  templateUrl: './batch-edit.component.html',
  styleUrls: ['./batch-edit.component.css']
})
export class BatchEditComponent implements OnInit {
  spinner: boolean = true;
  batch: Batch = {
    batchId: '',
    batchName: '',
    batchClass: '',
    batchDuration: '',
    batchFee: '',
    batchStartsFrom: '',
    batchTime: ''
  }
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
  constructor(private service: BatchService, private router: Router) { }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-red', showWeekNumbers: false, showTodayButton: true, showClearButton: true, withTimepicker: true, initCurrentTime: true, customTodayClass: 'today' });
  }

}
