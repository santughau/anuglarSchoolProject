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
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ExcelServiceService } from 'src/app/shared/services/excel-service.service';
import { ClassList } from 'src/app/classTitle/classList.model';
import { Batch } from 'src/app/batch/batch.model';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {
  modalRef?: BsModalRef;
  showMsg: boolean = false;
  showBatch: boolean = false;
  allExamList: any[] = [];
  allClassList: any[] = [];
  batchId: any = null;
  allBatchList: any[] = [];
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
  constructor(private modalService: BsModalService, public appService: SharedServiceService, private router: Router,  private excelService: ExcelServiceService, ) { }

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
    this.batch.batchId = 'select';
    this.batchId = ev.target.value;
    this.appService.showSpinner();
    this.appService.getMethod('batch/read_By_ClassWiase.php?id=' + this.batchId).subscribe((data) => {
      this.allBatchList = data.document;
      // console.log(this.allBatchList);
      this.appService.hideSpinner();
    });
  }

  loadBatch(ev: any) {
    this.batchId = ev.target.value;
    this.getData(this.batchId);
  }
  getData(id) {
    this.appService.showSpinner();
    this.appService.getMethod('exam/read.php?id=' + id).subscribe((data) => {
      this.allExamList = data.document;
      console.log("lenght = " + this.allExamList.length);
      if (this.allExamList.length !== 0) {
        this.showBatch = true;
        this.showMsg = false;
      } else {
        this.showMsg = true;
        this.showBatch = false;
      }

      console.log(this.allExamList);
      console.log(data);
      this.appService.hideSpinner();
    })
  }

  editExam(id: any) {
    console.log(id);
    this.router.navigate(['exam/examEdit', id])
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  decline(): void {
    this.modalRef?.hide();
  }

  confirm(id: any): void {
    this.appService.showSpinner();
    console.log(id);
    const data = {
      'examId': id
    }
    this.appService.postMethod('exam/delete.php', data).subscribe(res => {
      console.log("deleted" + res);
      if (res.status == 'success') {
        this.appService.hideSpinner();
        this.appService.errorsMsg('Exam Deleted Successfully!', 'Weldone!');
        this.modalRef?.hide();
      } else {
        this.appService.hideSpinner();
        this.appService.errorsMsg('Sorry Exam Was not Deleted Successfully!', 'OOPs Try Again!');
        this.modalRef?.hide();
      }
      this.modalRef?.hide();
      this.router.navigate(['/exam/examCreate'])
    });
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.allExamList, 'ExamList');
  }

  goToDownload(id: any, batch: any) {
    this.router.navigate(['exam/examUplaod', id, batch]);
  }

  goToPrint(id: any, batch: any) {
    let link = this.appService.serverUrl + 'result/report.php?id=' + id + '&batch=' + batch;
    window.open(link, "_blank");
  }
}
