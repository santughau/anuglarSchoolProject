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
import { Fee } from '../fee.model';
import { Student } from 'src/app/student/student.model';
import { Batch } from '../../batch/batch.model';
import { ClassList } from 'src/app/classTitle/classList.model';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
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
  
  constructor(private router: Router, private _route: ActivatedRoute,  public appService: SharedServiceService) { }

  ngOnInit(): void {
    this.appService.showSpinner();
    const id = this._route.snapshot.paramMap.get('id');
    this.appService.getMethod('fees/read_one.php?id=' + id).subscribe((data) => {
      this.fee = data.document;
      console.log(data.document);      
    });
    console.log(id);   
    this.getAllClass();
    this.appService.hideSpinner();
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

  updateFees() {
    const data = {
      'feeId':+this.fee.feeId,
      'feeClass':+this.classList.classId,
      'feeBatch':+this.batch.batchId,
      'feeStudentId':+this.fee.feeStudentId,
      'feeFeeAmt':+this.fee.feeFeeAmt,
    }
    this.appService.showSpinner();    
    this.appService.postMethod('fees/create.php', + data).subscribe(res => {
      if (res.status == 'success') {
        this.appService.successMsg('Fees Updated Successfully!', 'Weldone !');
        this.router.navigate(['/fee/feeList'])
      } else {
        this.appService.errorsMsg('Fees Not Updated Successfully!', 'Weldone !');
      }
    });
  }
}
