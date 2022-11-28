/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelServiceService } from 'src/app/shared/services/excel-service.service';
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit, OnDestroy, AfterViewInit {
  modalRef?: BsModalRef;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject<any>();
  record: any[] = [];
  showTable: boolean = false;
  constructor(private modalService: BsModalService,  private router: Router, private excelService: ExcelServiceService, public appService: SharedServiceService) { }

  ngOnInit(): void {
    this.appService.checkInternetConnection();
    this.getData()
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(true);
    this.getData();
  }


  getData() {
    this.record = [];
    this.appService.showSpinner();
    this.appService.getMethod('classlist/read.php').subscribe((data) => {
      this.record = data;
      if (this.appService.checkLengthArray(this.record)) {
        this.showTable = true;     
      } else {
        this.showTable = false;   
      }      
      this.appService.hideSpinner();
    });

  }
  editClass(i: any) {
    console.log(i);
    this.router.navigate(['class/classEdit', i])
  }

  deleteClass(i: any) {
    console.log(i);
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.record, 'ClassList');
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(id: any): void {
    console.log(id);
    const data = {
      'classId': id
    }
    this.appService.postMethod('classlist/delete.php', data).subscribe(res => {
      console.log("deleted");
      this.router.navigate(['/class/addClassList'])
    });
    this.appService.successMsg('Class Deleted Successfully!', 'Weldone !');
    this.modalRef?.hide();
  }

  decline(): void {
    this.modalRef?.hide();
  }
}
