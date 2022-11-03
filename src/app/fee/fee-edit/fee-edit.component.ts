import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig, DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';
import { Fee } from '../fee.model';
import { FeeService } from '../fee.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Student } from 'src/app/student/student.model';
import { Batch } from '../../batch/batch.model';
import { ClassList } from 'src/app/classTitle/classList.model';
import { StudentService } from 'src/app/student/student.service';
import { BatchService } from 'src/app/batch/batch.service';
@Component({
  selector: 'app-fee-edit',
  templateUrl: './fee-edit.component.html',
  styleUrls: ['./fee-edit.component.css']
})
export class FeeEditComponent implements OnInit {
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
  studentId: any;  
  
  constructor(private router: Router, private service: FeeService, private spinner: NgxSpinnerService, private _route: ActivatedRoute, private toastr: ToastrService, private batchService: BatchService, private studentService: StudentService,) { }

  ngOnInit(): void {
    this.spinner.show();
    const id = this._route.snapshot.paramMap.get('id');
    this.service.getSingleFee(id).subscribe((data) => {
      this.fee = data.document;
      console.log(data.document);      
    });
    console.log(id);   
    this.getAllClass();
    this.spinner.hide();
  }

  getAllClass() {
    this.spinner.show();
    this.batchService.getAllClass().subscribe((data) => {
      this.allClassList = data;
      this.spinner.hide();
    });
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

  updateFees() {
    const data = {
      'feeId':+this.fee.feeId,
      'feeClass':+this.classList.classId,
      'feeBatch':+this.batch.batchId,
      'feeStudentId':+this.fee.feeStudentId,
      'feeFeeAmt':+this.fee.feeFeeAmt,
    }
    this.spinner.show();  
   
    this.service.updateFee(data).subscribe(res => {
      if (res.status == 'success') {
        this.toastr.success('Fees Updated Successfully!', 'Weldone!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,     
        });
        this.router.navigate(['/fee/feeList'])
      } else {
        this.toastr.error('Fee Not  Updated Successfully!', 'Try Again!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,     
        });
     }
      
    }) 
  }
}
