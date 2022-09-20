import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsDatepickerConfig, DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';
import { ChapterService } from 'src/app/chapter/chapter.service';
import { Exam } from '../exam.model';
import { ExamService } from '../exam.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClassList } from 'src/app/classTitle/classList.model';
import { SubjectModel } from 'src/app/subject/subject.model';
import { Batch } from 'src/app/batch/batch.model';
import { BatchService } from 'src/app/batch/batch.service';

@Component({
  selector: 'app-exam-create',
  templateUrl: './exam-create.component.html',
  styleUrls: ['./exam-create.component.css']
})
export class ExamCreateComponent implements OnInit {
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
  constructor(private router: Router, private service: ExamService, private chapterService : ChapterService,private spinner: NgxSpinnerService, private toastr: ToastrService,private batchService : BatchService) {
  }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD-MM-YYYY, h:mm:ss a', containerClass: 'theme-red', showWeekNumbers: false, showTodayButton: true, showClearButton: true, withTimepicker: true, initCurrentTime: true, customTodayClass: 'today' });
    this.getData()
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

    this.service.createexam(data).subscribe((res) => {
      this.toastr.success('Exam Created Successfully!', 'Weldone!', {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: 'decreasing',
        closeButton: true,     
      });
      this.router.navigate(['/exam/examList']);
    });
  }

}
