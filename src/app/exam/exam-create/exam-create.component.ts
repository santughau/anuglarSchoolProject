import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsDatepickerConfig, DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';
import { Exam } from '../exam.model';
import { ExamService } from '../exam.service';

@Component({
  selector: 'app-exam-create',
  templateUrl: './exam-create.component.html',
  styleUrls: ['./exam-create.component.css']
})
export class ExamCreateComponent implements OnInit {
  spinner: boolean = true;
  exam: Exam = {
    examId: '',
    examClass: '',
    examBatch: '',
    examSubject: '',
    examTotalMarks: '',
    examName: '',
    examDate: ''
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
  constructor(private router: Router, private service: ExamService) {


  }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-red', showWeekNumbers: false, showTodayButton: true, showClearButton: true, withTimepicker: true, initCurrentTime: true, customTodayClass: 'today' });
  }

}
