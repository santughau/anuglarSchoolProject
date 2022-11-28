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
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../student.model';
import { ClassList } from 'src/app/classTitle/classList.model';
import { Batch } from 'src/app/batch/batch.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SubjectModel } from 'src/app/subject/subject.model';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  modalRef?: BsModalRef;
  showStudent: boolean = false;
  showMsg: boolean = false;
  allClassList: any[] = [];
  subjects: any[] = [];
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
  students: Student[] = [];
  batchId: any = null;
  allBatchList: any[] = [];
  constructor(private router: Router,    private modalService: BsModalService, private _route: ActivatedRoute, public appService: SharedServiceService) { }

  ngOnInit(): void {
    this.appService.showSpinner();
    this.showMsg = false;
    this.batchId = this._route.snapshot.paramMap.get('id');
    console.log('ss' + this.batchId);

    if (this.batchId !== null) {
      this.getData(this.batchId);
    }
    this.getAllClass();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.appService.hideSpinner();
    }, 5000);
  }

  getAllClass() {
    this.appService.showSpinner();
    this.appService.getMethod('classlist/read.php').subscribe((data) => {
      this.allClassList = data;
      this.appService.hideSpinner();
    })
  }

  loadBatches(ev: any) {
    console.log(ev.target.value);
    this.batch.batchId = 'select'
    this.batchId = ev.target.value;
    this.appService.showSpinner();
    this.appService.getMethod('batch/read_By_ClassWiase.php?id=' + this.batchId).subscribe((data) => {
      this.allBatchList = data.document;
      // console.log(this.allBatchList);
      this.appService.hideSpinner();
    });
  }

  loadStudent(ev: any) {
    this.batchId = ev.target.value;
    this.getData(this.batchId);
  }


  getData(batchId: any) {
    this.appService.showSpinner();
    this.appService.getMethod('student/read.php?id=' + batchId).subscribe((data) => {
      console.log(data);
      this.students = data.document;
      console.log("lenght = " + this.students.length);
      if (this.students.length !== 0) {
        this.showStudent = true;
        this.showMsg = false;
      } else {
        this.showMsg = true;
        this.showStudent = false;
      }
      console.log(this.students);
      this.appService.hideSpinner();
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  decline(): void {
    this.modalRef?.hide();
  }

  editStudent(id: any) {
    console.log(id);
    this.router.navigate(['student/studentEdit', id])
  }

  viewStudent(id: any) {
    console.log(id);
    this.router.navigate(['student/studentDetails', id])
  }

  confirm(id: any): void {
    console.log("sid" + id);
    const data = {
      'studentId': id
    }
    this.appService.postMethod('student/delete.php', data).subscribe(res => {
      console.log("deleted");
      this.router.navigate(['/student/students']);
      this.getData(this.batchId);
    });
    this.appService.successMsg('Student Deleted Successfully!', 'Weldone !');
    this.modalRef?.hide();
  }

  attendanceStudent(id: any) {
    console.log(id);
    this.router.navigate(['student/presenty', id])
  }
}
