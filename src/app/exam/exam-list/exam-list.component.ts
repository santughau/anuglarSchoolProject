import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Exam } from '../exam.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ExamService } from '../exam.service';
import { ExcelServiceService } from 'src/app/shared/services/excel-service.service';
@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {
  modalRef?: BsModalRef;
  allExamList: any[] = [];
  constructor(private modalService: BsModalService,private spinner: NgxSpinnerService, private toastr: ToastrService,private router : Router, private service :ExamService,private excelService: ExcelServiceService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.spinner.show();
    this.service.getAllExam().subscribe((data) => {
      this.allExamList = data.document;
      console.log(data);
      
      this.spinner.hide();
    })
  }

  editExam(id:any) {
    console.log(id);
    this.router.navigate(['exam/examEdit', id])
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.modalRef?.hide();
  }

  confirm(id: any): void {
    this.spinner.show();
    console.log(id); 
    const data = {
      'examId' : id
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
}
