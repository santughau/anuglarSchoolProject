import { Component, OnInit, TemplateRef } from '@angular/core';
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
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
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
  constructor(private modalService: BsModalService, private router: Router, private studentService: StudentService, private spinner: NgxSpinnerService, private toastr: ToastrService, private batchService: BatchService, private service: FeeService) { }

  ngOnInit(): void {
    this.getAllClass();
  }
  getAllClass() {

    this.spinner.show();
    this.batchService.getAllClass().subscribe((data) => {
      this.allClassList = data;
      this.spinner.hide();
    });
  }

  loadBaches(ev?: any) {
    this.batch.batchId = 'select';
    this.showfee = false;
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
    this.showfee = false;
    this.student.studentId = 'select';
    this.spinner.show();
    this.studentService.getAllStudents(ev.target.value).subscribe((data) => {
      this.studentList = data.document;
      console.log(this.studentList);

      this.spinner.hide();
    });
  }
  loadFees(ev: any) {
    this.showfee = false;
    this.studentId = ev.target.value;
    console.log(ev.target.value);
    this.spinner.show();
    
    this.getData(this.studentId);
  }

  getData(studentId) {
    this.service.getStudentAllFees(studentId).subscribe((data) => {
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
      this.spinner.hide();
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
    console.log(this.total_fee)
  }

  printBill(id: any) {
    console.log(id);
    const url = 'http://localhost/ranjana/fees/singleBill.php?id=' + id;
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
    this.service.deleteFees(data).subscribe(res => {
      console.log("deleted");
      this.router.navigate(['/fee/feeList']);
      this.getData(this.studentId);
    });
    this.toastr.error('Fee Deleted Successfully!', 'Weldone!', {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true,
    });
    this.modalRef?.hide();
  }

  editFee(i: any) {
    console.log(i);
    this.router.navigate(['fee/feeEdit', i])
  }

  allVoucherPrint(id) {
    console.log(id);
    const url = 'http://localhost/ranjana/fees/multiBill.php?id=' + id;
    window.open(url, '_blank');
  }
}
