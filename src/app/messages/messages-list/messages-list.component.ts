import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Messages } from '../messages.model';
import { MessagesService } from '../messages.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClassList } from 'src/app/classTitle/classList.model';
import { Batch } from 'src/app/batch/batch.model';
import { BatchService } from 'src/app/batch/batch.service';
import { StudentService } from 'src/app/student/student.service';
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit {
  p: number = 1;
  allClassList: any[] = [];
  batchId: any = null;
  modalRef?: BsModalRef;
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
  allBatchList: any[] = [];
  studentList: any[] = [];

  constructor(private modalService: BsModalService, private router: Router, private messageService: MessagesService, private spinner: NgxSpinnerService, private toastr: ToastrService, private batchService: BatchService, private studentService: StudentService) { }

  ngOnInit(): void {
    this.getAllClass();
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
      console.log(this.allBatchList);
      this.spinner.hide();
    });
  }

  loadBatch(ev: any) {
    this.batchId = ev.target.value;
    this.getData(this.batchId);
  }

  getData(id) {
    this.spinner.show();
    this.messageService.getAllMessages(this.batchId).subscribe((data) => {
      this.studentList = data.document;
      console.log(this.studentList);
    });
  }


  decline(): void {
    this.modalRef?.hide();
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(id: any): void {
    this.spinner.show();
    console.log(id);
    const data = {
      'messageId': id
    }
    this.messageService.deleteMsg(data).subscribe(res => {
      console.log("deleted" + res);
      if (res.status == 'success') {
        this.spinner.hide();
        this.toastr.error('Message Deleted Successfully!', 'Weldone!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,
        });
        this.modalRef?.hide();
      } else {
        this.spinner.hide();
        this.toastr.error('Sorry Message Was not Deleted Successfully!', 'OOPs Try Again!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,
        });
        this.modalRef?.hide();
      }
      this.modalRef?.hide();
      this.router.navigate(['/messages/messagesCreate'])
    });


  }

}
