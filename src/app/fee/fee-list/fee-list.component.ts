/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Fee } from '../fee.model';
import { ClassList } from 'src/app/classTitle/classList.model';
import { Batch } from '../../batch/batch.model';;
import { Student } from 'src/app/student/student.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
@Component({
  selector: 'app-fee-list',
  templateUrl: './fee-list.component.html',
  styleUrls: ['./fee-list.component.css']
})
export class FeeListComponent implements OnInit {
  modalRef?: BsModalRef;
  allClassList: any[] = [];
  allBatchList: any[] = [];
  studentList: any[] = [];
  feeList: any[] = [];
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
    feeDate: ''
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
  showfee: boolean = false;
  showMsg: boolean = false;
  total_fee = 0;
  studentId;
  constructor(private modalService: BsModalService, private router: Router, public appService: SharedServiceService) { }

  ngOnInit(): void {
    this.getAllClass();
  }

  getAllClass() {
    this.appService.showSpinner();
    this.appService.getMethod('classlist/read.php').subscribe((data) => {
      this.allClassList = data;
      this.appService.hideSpinner();
    });
  }

  loadBaches(ev?: any) {
    this.batch.batchId = 'select';
    this.showfee = false;
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
    this.showfee = false;
    this.student.studentId = 'select';
    this.appService.showSpinner();
    this.appService.getMethod('student/read.php?id=' + ev.target.value).subscribe((data) => {
      this.studentList = data.document;
      console.log(this.studentList);
      this.appService.hideSpinner();
    });
  }

  loadFees(ev: any) {
    this.showfee = false;
    this.studentId = ev.target.value;
    console.log(ev.target.value);
    this.appService.showSpinner();    
    this.getData(this.studentId);
  }

  getData(studentId) {
    this.appService.getMethod('fees/read_By_studentId.php?id=' + studentId).subscribe((data) => {
      this.feeList = data.document;
      console.log(this.feeList);
      this.showfee = true;
      if (this.feeList.length !== 0) {
        this.showfee = true;
        this.showMsg = false;
      } else {
        this.showMsg = true;
        this.showfee = false;
      }
      this.appService.hideSpinner();
      this.findsum(this.feeList)
    });
  }

  findsum(data) {
    this.total_fee = 0;
    let tvalue = data
    console.log(tvalue);
    for (let j = 0; j < data.length; j++) {
      this.total_fee += parseInt(tvalue[j].feeFeeAmt);
    }
    console.log(this.total_fee);
  }

  printBill(id: any) {
    console.log(id);
    const url = this.appService.serverUrl + 'fees/singleBill.php?id=' + id;
    window.open(url, '_blank');
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  decline(): void {
    this.modalRef?.hide();
  }

  confirm(id: any): void {
    console.log(id);
    const data = {
      'feeId': id
    }
    this.appService.postMethod('fees/delete.php', data).subscribe(res => {
      console.log("deleted");
      this.router.navigate(['/fee/feeList']);
      this.getData(this.studentId);
    });
    this.appService.errorsMsg('Fees Deleted Successfully!', 'Weldone !');
    this.modalRef?.hide();
  }

  editFee(i: any) {
    console.log(i);
    this.router.navigate(['fee/feeEdit', i])
  }

  allVoucherPrint(id) {
    console.log(id);
    const url = this.appService.serverUrl + 'fees/multiBill.php?id=' + id;
    window.open(url, '_blank');
  }
}
