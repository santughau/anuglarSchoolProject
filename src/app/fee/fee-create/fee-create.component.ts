import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsDatepickerConfig, DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';
import { Fee } from '../fee.model';
import { FeeService } from '../fee.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClassList } from 'src/app/classTitle/classList.model';
import { StudentService } from 'src/app/student/student.service';
import { Batch } from '../../batch/batch.model';
import { BatchService } from 'src/app/batch/batch.service';
import { Student } from 'src/app/student/student.model';

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
  constructor(private router: Router, private studentService: StudentService, private spinner: NgxSpinnerService, private toastr: ToastrService, private batchService: BatchService, private service: FeeService) { }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD-MM-YYYY, h:mm:ss a', containerClass: 'theme-red', showWeekNumbers: false, showTodayButton: true, showClearButton: true, withTimepicker: true, initCurrentTime: true, customTodayClass: 'today' });
    this.getAllClass();
    this.spinner.show();
    this.service.getLastInsertId().subscribe((data) => {
      // this.fee = data.document.feeId;
      this.fee.feeVoucherNo = parseInt(data.document.Auto_increment) ;
      console.log(this.fee);

      this.spinner.hide();
    });
  }


  getAllClass() {
    this.spinner.show();
    this.batchService.getAllClass().subscribe((data) => {
      this.allClassList = data;
      this.spinner.hide();
    })
  }

  loadBaches(ev?: any) {
    this.batch.batchId = 'select'
    this.batchId = ev.target.value;
    // const id = ev.target.value;
    this.spinner.show();


    this.batchService.getBatchWiseClass(this.batchId).subscribe((data) => {
      this.allBatchList = data.document;

      this.spinner.hide();
    });


  }


  loadStudents(ev: any) {
    console.log(ev.target.value);
    this.student.studentId = 'select';
    this.spinner.show();
    this.studentService.getAllStudents(ev.target.value).subscribe((data) => {
      this.studentList = data.document;
      console.log(this.studentList);

      this.spinner.hide();
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

    this.service.createFee(data).subscribe((res) => {
      this.toastr.success('Exam Created Successfully!', 'Weldone!', {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: 'decreasing',
        closeButton: true,
      });
      this.router.navigate(['/fee/feeList']);
    });

  }
}
