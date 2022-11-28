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
import { BsDatepickerConfig, DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';
import { Fee } from '../fee.model';
import { ClassList } from 'src/app/classTitle/classList.model';
import { Batch } from '../../batch/batch.model';
import { Student } from 'src/app/student/student.model';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';

@Component({
  selector: 'app-fee-create',
  templateUrl: './fee-create.component.html',
  styleUrls: ['./fee-create.component.css']
})
export class FeeCreateComponent implements OnInit {
  allClassList: any[] = [];
  allBatchList: any[] = [];
  studentList: any[] = [];
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
  fee: Fee = {
    feeId: '',
    feeClass: '',
    feeBatch: '',
    feeStudentId: '',
    feeStudentName: '',
    feeFeeAmt: '',
    feeVoucherNo: '',
    feeDate: new Date()
  }
  student: Student = {
    studentId: 'select',
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
  bsConfig?: Partial<BsDatepickerConfig>;
  studentId: any;
  today = new Date()
  selectedDates: DatepickerDateTooltipText[] = [{ date: new Date('2022-03-08'), tooltipText: 'Present' },
  { date: new Date('2022-03-09'), tooltipText: 'Absent' },
  { date: new Date('2022-03-07'), tooltipText: 'Present' }
  ];

  disabledDates = [
    new Date('2022-03-05'),
    new Date('2022-03-09')
  ];
  constructor(private router: Router, public appService: SharedServiceService) { }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD-MM-YYYY, h:mm:ss a', containerClass: 'theme-red', showWeekNumbers: false, showTodayButton: true, showClearButton: true, withTimepicker: true, initCurrentTime: true, customTodayClass: 'today' });
    this.getAllClass();
    this.appService.showSpinner();
    this.appService.getMethod('fees/lastId.php').subscribe((data) => {
      // this.fee = data.document.feeId;
      this.fee.feeVoucherNo = parseInt(data.document.Auto_increment) ;
      console.log(this.fee);
      this.appService.hideSpinner();
    });
  }


  getAllClass() {
    this.appService.showSpinner();
    this.appService.getMethod('classlist/read.php').subscribe((data) => {
      this.allClassList = data;
      this.appService.hideSpinner();
    });
  }

  loadBaches(ev?: any) {
    this.batch.batchId = 'select'
    this.batchId = ev.target.value;
    // const id = ev.target.value;
    this.appService.showSpinner();
    this.appService.getMethod('batch/read_By_ClassWiase.php?id=' + this.batchId).subscribe((data) => {
      this.allBatchList = data.document;
      this.appService.hideSpinner();
    });
  }


  loadStudents(ev: any) {
    console.log(ev.target.value);
    this.student.studentId = 'select';
    this.appService.showSpinner();
    this.appService.getMethod('student/read.php?id=' + ev.target.value).subscribe((data) => {
      this.studentList = data.document;
      console.log(this.studentList);
      this.appService.hideSpinner();
    });
  }

  saveFees() {
    const data = {
      'feeClass': this.classList.classId,
      'feeBatch': this.batch.batchId,
      'feeStudentId': this.student.studentId,
      'feeFeeAmt': this.fee.feeFeeAmt,
      'feeVoucherNo': this.fee.feeVoucherNo,
      'feeDate': this.fee.feeDate
    }
    console.log(data);
    this.appService.postMethod('fees/create.php',data).subscribe((res) => {
      this.appService.successMsg('Exam Created Successfully !', 'Weldone !');
      this.router.navigate(['/fee/feeList']);
    });
  }
}
