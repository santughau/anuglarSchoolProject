import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Student } from '../student.model';
import { StudentService } from '../student.service';
import { ClassList } from 'src/app/classTitle/classList.model';
import { Batch } from 'src/app/batch/batch.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SubjectModel } from 'src/app/subject/subject.model';
import { ToastrService } from 'ngx-toastr';
import { BatchService } from 'src/app/batch/batch.service';

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
  constructor(private router : Router, private service :StudentService,private spinner: NgxSpinnerService,private toastr: ToastrService,private modalService: BsModalService,private _route: ActivatedRoute,private batchService : BatchService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.showMsg = false;
    this.batchId = this._route.snapshot.paramMap.get('id');
    console.log('ss' +this.batchId);
    
    if (this.batchId !== null) {
      this.getData(this.batchId);
    }
    this.getAllClass();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }

  getAllClass() {
    this.spinner.show();
    this.batchService.getAllClass().subscribe((data) => {
      this.allClassList = data;      
      this.spinner.hide();
    })
  }

  loadBatches(ev: any) {
    console.log(ev.target.value);
    this.batch.batchId = 'select'
    this.batchId = ev.target.value;
    this.spinner.show();
    this.batchService.getBatchWiseClass(this.batchId).subscribe((data) => {
      this.allBatchList = data.document;
      
     // console.log(this.allBatchList);
      this.spinner.hide();
      
    });
  }

  loadStudent(ev: any) {
    this.batchId = ev.target.value;

    this.getData(this.batchId);
  }


  getData(batchId:any) {
    this.service.getAllStudents(batchId).subscribe((data) => {
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
      this.spinner.hide();
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.modalRef?.hide();
  }

  editStudent(id:any) {
    console.log(id);
    this.router.navigate(['student/studentEdit', id])
  }

  viewStudent(id:any) {
    console.log(id);
    this.router.navigate(['student/studentDetails', id])
  }

  confirm(id:any): void {
    console.log("sid" + id); 
    const data = {
      'studentId' : id
    }
    this.service.deleteStudent(data).subscribe(res => {
      console.log("deleted");
      this.router.navigate(['/student/students']);
      this.getData(this.batchId);
    });
    this.toastr.error('Student Deleted Successfully!', 'Weldone!', {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true,     
    });
    this.modalRef?.hide();
  }
}
