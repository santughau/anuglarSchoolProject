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
import { Exam } from '../exam.model';
import { ExamService } from '../exam.service';
@Component({
  selector: 'app-exam-download-csv',
  templateUrl: './exam-download-csv.component.html',
  styleUrls: ['./exam-download-csv.component.css']
})
export class ExamDownloadCsvComponent implements OnInit {
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
  constructor(private router : Router, public appService: SharedServiceService) { }

  ngOnInit(): void {
  }

}
