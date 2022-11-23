import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Exam } from '../exam.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ExamService } from '../exam.service';
import { ExcelServiceService } from 'src/app/shared/services/excel-service.service';
import { ClassList } from 'src/app/classTitle/classList.model';
import { Batch } from 'src/app/batch/batch.model';
import { BatchService } from 'src/app/batch/batch.service';
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
  constructor(private modalService: BsModalService, private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router, private service: ExamService, private excelService: ExcelServiceService, private batchService: BatchService) { }

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
      // console.log(this.allBatchList);
      this.spinner.hide();
    });
  }

  loadBatch(ev: any) {
    this.batchId = ev.target.value;
    this.getData(this.batchId);
  }
  getData(id) {
    this.spinner.show();
    this.service.getAllExam(id).subscribe((data) => {
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
      this.spinner.hide();
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
    this.spinner.show();
    console.log(id);
    const data = {
      'examId': id
    }
    this.service.deleteExam(data).subscribe(res => {
      console.log("deleted" + res);
      if (res.status == 'success') {
        this.spinner.hide();
        this.toastr.error('Exam Deleted Successfully!', 'Weldone!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,
        });
        this.modalRef?.hide();
      } else {
        this.spinner.hide();
        this.toastr.error('Sorry Exam Was not Deleted Successfully!', 'OOPs Try Again!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,
        });
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
    this.router.navigate(['exam/examUplaod', id, batch])
  }

  goToPrint(id: any, batch: any) {
    let link = 'http://localhost/ranjana/result/report.php?id=' + id + '&batch=' + batch;
    window.open(link, "_blank");
  }
}
