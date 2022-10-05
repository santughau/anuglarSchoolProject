import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsDatepickerConfig, DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';
import { Student } from '../student.model';
import { StudentService } from '../student.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClassList } from 'src/app/classTitle/classList.model';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Batch } from '../../batch/batch.model';
import { BatchService } from 'src/app/batch/batch.service';
@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})


export class StudentCreateComponent implements OnInit {
  showTable: boolean = false;
  allClassList: any[] = [];
  allBatchList: any[] = [];
  batchId: any = null;
  classList: ClassList = {
    className: '',
    classId: 'select',
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
  medium: any = {
    value: 'select',
    name:''
  }
  
  student: Student = {
    studentId: '',
    studentName: '',
    studentAddress: '',
    studentClass: '',
    studentBatch: '',
    studentMedium: '',
    studentGender: 'select',
    studentMobile: '',
    studentEmail: '',
    studentSchool: '',
    studentFee: '',
    studentPassword: '',
    studentMac: '',
    studentDob: new Date(),
    studentSubject: '',
    studentCompExam: '',
    studentImage: '',
    studentStatus: true,
    studentCreated: '',
  }

  mediumData: any = [
    {value:"Marathi" , name:"Marathi"},
    {value:"Semi" , name:"Semi"},
    {value:"CBSE" , name:"CBSE"},
  ]
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
  constructor(private router : Router, private studentService :StudentService,private spinner: NgxSpinnerService, private toastr: ToastrService,private batchService : BatchService,) {


  }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD-MM-YYYY, h:mm:ss a', containerClass: 'theme-red', showWeekNumbers: false, showTodayButton: true, showClearButton: true, withTimepicker: true, initCurrentTime: true, customTodayClass: 'today' });
    this.getAllClass();
  }

  getAllClass() {
    this.spinner.show();
    this.batchService.getAllClass().subscribe((data) => {
      this.allClassList = data;
      console.log( this.allClassList);
      
      this.spinner.hide();
    })
  }

  loadBaches(ev?: any) {
    this.batch.batchId = 'select'
    console.log(ev.target.value);
    console.log(ev);
    this.batchId = ev.target.value;
   // const id = ev.target.value;
    this.spinner.show();
    this.batchService.getBatchWiseClass(this.batchId).subscribe((data) => {
      this.allBatchList = data.document;
      if (this.allBatchList.length == 0) {
        this.showTable = false;
        console.log(this.showTable);        
      } else {
        this.showTable = true;
      }
      console.log(this.allBatchList);
      this.spinner.hide();
      
    })
    
  }

}
