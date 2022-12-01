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
import { Router, ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig, DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';
import { Exam } from '../exam.model';
import { ClassList } from 'src/app/classTitle/classList.model';
import { SubjectModel } from 'src/app/subject/subject.model';
import { Batch } from 'src/app/batch/batch.model';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
@Component({
  selector: 'app-exam-edit',
  templateUrl: './exam-edit.component.html',
  styleUrls: ['./exam-edit.component.css']
})
export class ExamEditComponent implements OnInit {
  examId: any;
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
    examDate: ''
  }
  bsConfig?: Partial<BsDatepickerConfig>;


  selectedDates: DatepickerDateTooltipText[] = [{ date: new Date('2022-03-08'), tooltipText: 'Present' },
  { date: new Date('2022-03-09'), tooltipText: 'Absent' },
  { date: new Date('2022-03-07'), tooltipText: 'Present' }
  ];

  disabledDates = [
    new Date('2022-03-05'),
    new Date('2022-03-09')
  ];
  constructor(private router: Router, public appService: SharedServiceService, private _route: ActivatedRoute,) {


  }

  ngOnInit(): void {
    this.appService.showSpinner();
    this.examId = this._route.snapshot.paramMap.get('id');

    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD-MM-YYYY, h:mm:ss a', containerClass: 'theme-red', showWeekNumbers: false, showTodayButton: true, showClearButton: true, withTimepicker: true, initCurrentTime: true, customTodayClass: 'today' });

    this.getData();
    this.appService.getMethod('exam/read_one.php?id=' + this.examId).subscribe((data) => {
      console.log(data);
      this.exam = data.document;
      console.log(this.exam.examDate);
      this.exam.examDate = new Date();
      console.log(this.exam.examDate);
      this.appService.hideSpinner();
    })
  }


  getData() {
    this.appService.showSpinner();
    this.appService.getMethod('classlist/read.php').subscribe((data) => {
      this.allClassList = data;
      console.log(this.allClassList);
      this.appService.hideSpinner();
    })
  }

  loadSubjects(ev: any) {
    this.subjectModel.subjectId = 'select'
    this.batch.batchId = 'select'
    console.log(ev);
    const id = ev.target.value;
    this.appService.showSpinner();
    this.appService.getMethod('subjectmodel/read_By_subjectClassId.php?id=' + id).subscribe((data) => {
      this.subjects = data.document;
      console.log(this.subjects);
      this.appService.hideSpinner();
    });

    this.appService.getMethod('batch/read_By_ClassWiase.php?id=' + id).subscribe((data) => {
      this.allBatchList = data.document;
      console.log(this.allBatchList);
      this.appService.hideSpinner();

    })

  }
  updateExam() {
    const data = {
      examId: this.exam.examId,
      examClass: this.exam.examClass,
      examBatch: this.exam.examBatch,
      examSubject: this.exam.examSubject,
      examTotalMarks: this.exam.examTotalMarks,
      examName: this.exam.examName,
      examDate: this.exam.examDate
    }
    // this.spinner.show();  
    console.log(data);
    this.appService.postMethod('exam/update.php', data).subscribe(res => {
      console.log("res + " + res);

      if (res.status == 'success') {
        this.appService.successMsg('Exam Updated Successfully!', 'Weldone!');
        this.router.navigate(['/exam/examList'])
      } else {
        this.appService.errorsMsg('Exam Not Updated Successfully!', 'Weldone!');
      }
    })
  }
}
