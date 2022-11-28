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
import { ClassList } from 'src/app/classTitle/classList.model';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
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
  constructor(private router : Router,private modalService: BsModalService,public appService: SharedServiceService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.appService.showSpinner();
    this.appService.getMethod('classlist/read.php').subscribe((data) => {
      this.allClassList = data;
      this.appService.hideSpinner();
    });
  }

  loadBaches(ev?:any) {
    console.log(ev.target.value);
    console.log(ev);
    this.batchId = ev.target.value;
   // const id = ev.target.value;
   this.appService.showSpinner();
    this.appService.getMethod('batch/read_By_ClassWiase.php?id=' + this.batchId).subscribe((data) => {
      this.allBatchList = data.document;
      if (this.allBatchList.length == 0) {
        this.showTable = false;
        console.log(this.showTable);
      } else {
        this.showTable = true;
      }
      console.log(this.allBatchList);
      this.appService.hideSpinner();
    });    
  }

  editBatch(id:any) {
    console.log(id);
    this.router.navigate(['batch/batchEdit', id])
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }


  confirm(id: any): void {
    this.appService.showSpinner();
    console.log(id); 
    const data = {
      'batchId' : id
    }
    this.appService.postMethod('batch/delete.php',data).subscribe(res => {
      if (res.status == 'success') {
        this.appService.hideSpinner();
        this.appService.errorsMsg('Batch Deleted Successfully!', 'Weldone !');
        this.modalRef?.hide();
       this.router.navigate(['/batch/batchCreate']);     
      } else {
        this.appService.hideSpinner();
        this.appService.errorsMsg('Batch Was not Deleted Successfully!', 'Try Again !');
        this.modalRef?.hide();      }
      this.modalRef?.hide();
      this.router.navigate(['/batch/batchCreate'])
    });    
  }

  decline(): void {
    this.modalRef?.hide();
  }

  batchDetails(id) {
    console.log(id);
    this.router.navigate(['batch/batchDetails', id]);
  }

}
