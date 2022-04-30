import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsDatepickerConfig, DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';
import { Student } from '../student.model';
import { StudentService } from '../student.service';
@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})


export class StudentCreateComponent implements OnInit {
  spinner: boolean = true;
  student: Student = {
    studentId: '',
    studentAddress: '',
    studentClass: '',
    studentBatch: '',
    studentMedium: '',
    studentGender: '',
    studentMobile: '',
    studentEmail: '',
    studentSchool: '',
    studentFee: '',
    studentPassword: '',
    studentMac: '',
    studentDob: '',
    studentSubject: '',
    studentCompExam: '',
    studentImage: '',
    studentStatus: true,
    studentCreated: '',
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
  constructor(private router : Router, private service :StudentService) {


  }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-red', showWeekNumbers: false, showTodayButton:true,showClearButton: true,withTimepicker:true,initCurrentTime:true,customTodayClass:'today'});
  }

}
