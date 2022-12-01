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
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
@Component({
  selector: 'app-expences-list',
  templateUrl: './expences-list.component.html',
  styleUrls: ['./expences-list.component.css']
})
export class ExpencesListComponent implements OnInit {
  showTable: boolean = false;
  expencesId: any = null;
  modalRef?: BsModalRef;

  allExpenses: any[] = [];
  constructor( private router: Router, private modalService: BsModalService, public appService: SharedServiceService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.appService.showSpinner();
    this.appService.getMethod('expense/read.php').subscribe((data) => {
      this.allExpenses = data.document;
      console.log(this.allExpenses);
      this.appService.hideSpinner();
    });
  }

  editExpense(id: any) {
    console.log(id);
    this.router.navigate(['expences/expencesEdit', id])
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
      'expencesId': id
    }
    this.appService.postMethod('expense/delete.php', data).subscribe(res => {
      if (res.status == 'success') {
        this.appService.hideSpinner();
        this.appService.errorsMsg('Expenses Deleted Successfully !', 'Weldone !');
        this.modalRef?.hide();
        this.router.navigate(['/expences/expencesCreate']);
      } else {
        this.appService.hideSpinner();
        this.appService.errorsMsg('Expenses was not Deleted Successfully !', 'Weldone !');
        this.modalRef?.hide();
      }
      this.modalRef?.hide();
      this.router.navigate(['/expences/expencesCreate'])
    });
  }
}
