import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig, DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';
import { Exam } from '../exam.model';
import { ExamService } from '../exam.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClassList } from 'src/app/classTitle/classList.model';
import { SubjectModel } from 'src/app/subject/subject.model';
import { Batch } from 'src/app/batch/batch.model';
import { ChapterService } from 'src/app/chapter/chapter.service';
import { BatchService } from 'src/app/batch/batch.service';
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
  constructor(private router : Router, private service :ExamService,private spinner: NgxSpinnerService,private _route: ActivatedRoute,private toastr: ToastrService,private chapterService : ChapterService,private batchService : BatchService) {


  }

  ngOnInit(): void {
    this.spinner.show();
    this.examId = this._route.snapshot.paramMap.get('id');

    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD-MM-YYYY, h:mm:ss a', containerClass: 'theme-red', showWeekNumbers: false, showTodayButton: true, showClearButton: true, withTimepicker: true, initCurrentTime: true, customTodayClass: 'today' });

    this.getData()
    this.service.getSingleExan(this.examId).subscribe((data) => {
      console.log(data);
      this.exam = data.document;
      console.log(this.exam.examDate);
      this.exam.examDate = new Date();
      console.log(this.exam.examDate);      
      this.spinner.hide();
    })
  }
  

  getData() {
    this.spinner.show();
    this.chapterService.getAllClass().subscribe((data) => {
      this.allClassList = data;
      console.log(this.allClassList);
      this.spinner.hide();
    })
  }

  loadSubjects(ev: any) { 
    this.subjectModel.subjectId = 'select'
    this.batch.batchId = 'select'
    console.log(ev);
    const id = ev.target.value;
    this.spinner.show();
    this.chapterService.getSubjectClassWise(id).subscribe((data) => {
      this.subjects = data.document;
      console.log(this.subjects);
      this.spinner.hide();
    })

    this.batchService.getBatchWiseClass(id).subscribe((data) => {
      this.allBatchList = data.document;      
      console.log(this.allBatchList);
      this.spinner.hide();
      
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
    this.service.updateExam(data).subscribe(res => {
      console.log("res + " + res);
      
      if (res.status == 'success') {
        this.toastr.success('Exam Updated Successfully!', 'Weldone!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,     
        });
        this.router.navigate(['/exam/examList'])
      } else {
        this.toastr.error('Exam Not  Updated Successfully!', 'Try Again!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,     
        });
     }
      
    })
  }

}
