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
import { ExcelServiceService } from 'src/app/shared/services/excel-service.service';
import { SubjectModel } from '../subject.model';
import { SelectRequiredValidatorDirective } from 'src/app/shared/directive/select-required-validator.directive';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
  record: any[] = [];
  p: number = 1;
  subjects: SubjectModel[] = [];
  subjectModel: SubjectModel = {
    subjectId: '',
    subjectClassId: 'select',
    subjectClass: '',
    subjectName: '',
  }
  modalRef?: BsModalRef;
  showTable: boolean = false
  constructor(private modalService: BsModalService, private router: Router, private excelService: ExcelServiceService, private appService: SharedServiceService) { }

  ngOnInit(): void {
    this.getData();
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.subjects, 'SubjectList');
  }

  getData() {
    this.record = [];
    this.appService.showSpinner();
    this.appService.getMethod('classlist/read.php').subscribe((data) => {
      this.record = data;
      //console.log(this.record);     
      this.appService.hideSpinner();
    })
  }

  showSubject() {
    this.p = 1;
    this.showTable = false;
    this.subjects = [];
    this.appService.showSpinner();
    let url = 'subjectmodel/read_By_subjectClassId.php?id=' + this.subjectModel.subjectClassId;
    this.appService.getMethod(url).subscribe((data) => {
      this.subjects = data.document;
      if (this.subjects.length == 0) {
        this.showTable = false;
        console.log(this.showTable);
      } else {
        this.showTable = true;
      }
      console.log(this.subjects);
      this.appService.hideSpinner();
    });
  }

  editSubject(id: any) {
    console.log(id);
    this.router.navigate(['subject/subjectEdit', id])
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(id: any): void {
    this.appService.showSpinner();
    console.log(id);
    const data = {
      'subjectId': id
    }
    this.appService.postMethod('subjectmodel/delete.php', data).subscribe(res => {
      console.log("deleted" + res);
      if (res.status == 'success') {
        this.appService.hideSpinner();
        this.appService.successMsg('Subject Deleted Successfully!', 'Weldone !');
        this.modalRef?.hide();
      } else {
        this.appService.hideSpinner();
        this.appService.errorsMsg('Sorry Subject Was not Deleted Successfully!', 'Try all Chapters delete First');
        this.modalRef?.hide();
      }
      this.modalRef?.hide();
      this.router.navigate(['/subject/addSubject'])
    });
  }

  decline(): void {
    this.modalRef?.hide();
  }
}



















