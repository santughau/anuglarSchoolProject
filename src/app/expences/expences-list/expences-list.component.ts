import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Expences } from '../expences.model';
import { ExpencesService } from '../expences.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
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
  constructor( private service :ExpencesService,private router : Router,private modalService: BsModalService,private spinner: NgxSpinnerService, private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.spinner.show();
    this.service.getAllExpenses().subscribe((data) => {
      this.allExpenses = data.document;
      console.log(this.allExpenses);      
      this.spinner.hide();
    })
  }

  editExpense(id:any) {
    console.log(id);
    this.router.navigate(['expences/expencesEdit', id])
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
      'expencesId' : id
    }
    this.service.deleteExpense(data).subscribe(res => {
      if (res.status == 'success') {
        this.spinner.hide();
        this.toastr.error('Expense Deleted Successfully!', 'Weldone!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,     
        });
        this.modalRef?.hide();
       this.router.navigate(['/expences/expencesCreate']);     
      } else {
        this.spinner.hide();
        this.toastr.error('Sorry Expense Was not Deleted Successfully!', 'OOPs Try Again!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,     
        });
        this.modalRef?.hide();      }
      this.modalRef?.hide();
      this.router.navigate(['/expences/expencesCreate'])
    });
    
    
  }
}
