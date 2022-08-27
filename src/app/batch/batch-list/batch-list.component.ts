import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Batch } from '../batch.model';
import { BatchService } from '../batch.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClassList } from 'src/app/classTitle/classList.model';
@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrls: ['./batch-list.component.css']
})
export class BatchListComponent implements OnInit {
  
  showTable: boolean = false;
  batchId: any = null;
  modalRef?: BsModalRef;
  allClassList: any[] = [];
  allBatchList: any[] = [];
  classList: ClassList = {
    className: '',
    classId: 'select',
  }
  constructor(private service : BatchService,private router : Router,private modalService: BsModalService,private spinner: NgxSpinnerService, private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.spinner.show();
    this.service.getAllClass().subscribe((data) => {
      this.allClassList = data;
      this.spinner.hide();
    })
  }

  loadBaches(ev?:any) {
    console.log(ev.target.value);
    console.log(ev);
    this.batchId = ev.target.value;
   // const id = ev.target.value;
    this.spinner.show();
    this.service.getBatchWiseClass(this.batchId).subscribe((data) => {
      this.allBatchList = data.document;
      if (this.allBatchList.length == 0) {
        this.showTable = false;
        console.log(this.showTable);        
      } else {
        this.showTable = true;
      }
      console.log(this.allBatchList);
      this.spinner.hide();
      
    })
    
  }

  editBatch(id:any) {
    console.log(id);
    this.router.navigate(['batch/batchEdit', id])
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }


  confirm(id: any): void {
    this.spinner.show();
    console.log(id); 
    const data = {
      'batchId' : id
    }
    this.service.deleteBatch(data).subscribe(res => {
      if (res.status == 'success') {
        this.spinner.hide();
        this.toastr.error('Batch Deleted Successfully!', 'Weldone!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,     
        });
        this.modalRef?.hide();
       this.router.navigate(['/batch/batchCreate']);     
      } else {
        this.spinner.hide();
        this.toastr.error('Sorry Batch Was not Deleted Successfully!', 'OOPs Try Again!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,     
        });
        this.modalRef?.hide();      }
      this.modalRef?.hide();
      this.router.navigate(['/batch/batchCreate'])
    });
    
    
  }

  decline(): void {
    this.modalRef?.hide();
  }

}
