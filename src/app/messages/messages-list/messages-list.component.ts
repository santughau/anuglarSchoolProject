/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import {  Component,  OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ClassList } from 'src/app/classTitle/classList.model';
import { Batch } from 'src/app/batch/batch.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
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

  loadBatches(ev: any) {
    console.log(ev.target.value);
    this.batch.batchId = 'select'
    this.batchId = ev.target.value;
    this.appService.showSpinner();
    this.appService.getMethod('batch/read_By_ClassWiase.php?id=' +this.batchId).subscribe((data) => {
      this.allBatchList = data.document;
      console.log(this.allBatchList);
      this.appService.hideSpinner();
    });
  }

  loadBatch(ev: any) {
    this.batchId = ev.target.value;
    this.getData(this.batchId);
  }

  getData(id) {
    this.appService.showSpinner();
    this.appService.getMethod('messages/read.php?id=' + this.batchId).subscribe((data) => {
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
    this.appService.showSpinner();
    console.log(id);
    const data = {
      'messageId': id
    }
    this.appService.postMethod('messages/delete.php',data).subscribe(res => {
      console.log("deleted" + res);
      if (res.status == 'success') {
        this.appService.hideSpinner();
        this.appService.errorsMsg('Message Deleted Successfully!', 'Weldone!');
        this.modalRef?.hide();
      } else {
        this.appService.hideSpinner();
        this.appService.errorsMsg('Message was not Deleted Successfully!', 'Weldone!');
        this.modalRef?.hide();
      }
      this.modalRef?.hide();
      this.router.navigate(['/messages/messagesCreate'])
    });
  }

}
