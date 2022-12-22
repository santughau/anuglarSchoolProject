/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsDatepickerConfig, DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';
import { Exam } from '../exam.model';
import { ClassList } from 'src/app/classTitle/classList.model';
import { SubjectModel } from 'src/app/subject/subject.model';
import { Batch } from 'src/app/batch/batch.model';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-exam-create',
  templateUrl: './exam-create.component.html',
  styleUrls: ['./exam-create.component.css']
})
export class ExamCreateComponent implements OnInit {
  @ViewChild('examForm') public examForm:NgForm;
  allClassList: any[] = [];
  subjects: any[] = [];
  allBatchList: any[] = [];
  classList: ClassList = {
    className: '',
    classId: 'select',
  }
  subjectModel: SubjectModel = {
    subjectId: 'select',
    subjectClassId: '',
    subjectClass: '',
    subjectName: '',
  }
  batch: Batch = {
    batchId: 'select',
    batchName: '',
    batchClass: '',
    batchDuration: '',
    batchFee: '',
    batchStartsFrom: new Date('Aug 22 2022 08:58:02 GMT+0530'),
    batchTime: ''
  }
  exam: Exam = {
    examId: '',
    examClass: '',
    examBatch: '',
    examSubject: '',
    examTotalMarks: '',
    examName: '',
    examDate: new Date('Aug 22 2022 08:58:02 GMT+0530'),
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
  constructor(private router: Router, public appService: SharedServiceService,) {
  }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD-MM-YYYY, h:mm:ss a', containerClass: 'theme-red', showWeekNumbers: false, showTodayButton: true, showClearButton: true, withTimepicker: true, initCurrentTime: true, customTodayClass: 'today' });
    this.getData();
  }

  getData() {
    this.appService.showSpinner();
    this.appService.getMethod('classlist/read.php').subscribe((data) => {
      this.allClassList = data;
      console.log(this.allClassList);
      this.appService.hideSpinner();
    });
  }

  loadSubjects(ev: any) { 
    this.subjectModel.subjectId = 'select'
    this.batch.batchId = 'select'
    console.log(ev);
    const id = ev.target.value;
    this.appService.showSpinner();
    this.appService.getMethod('subjectmodel/read_By_subjectClassId.php?id='+id).subscribe((data) => {
      this.subjects = data.document;
      console.log(this.subjects);
      this.appService.hideSpinner();
    })

    this.appService.getMethod('batch/read_By_ClassWiase.php?id=' + id).subscribe((data) => {
      this.allBatchList = data.document;
      console.log(this.allBatchList);
      this.appService.hideSpinner();      
    });    
  }

  addExam() {    
    const data = {
      'examClass': this.classList.classId,
      'examBatch': this.batch.batchId,
      'examSubject': this.subjectModel.subjectId,
      'examTotalMarks': this.exam.examTotalMarks,
      'examName': this.exam.examName,
      'examDate':this.exam.examDate
    }    
    console.log(data);
    this.appService.postMethod('exam/create.php', data).subscribe((res) => {
      if (res.status == 'success') {
        this.examForm.reset();        
        this.appService.successMsg('Exam Created Successfully!', 'Weldone!');
        this.router.navigate(['/exam/examList']);
      }
   
    });
  }
}
