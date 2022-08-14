import { AfterViewInit, Component, OnDestroy, OnInit,TemplateRef  } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClassTitleService } from '../class-title.service';
import { ClassList } from '../classList.model';
import { ExcelServiceService } from 'src/app/shared/services/excel-service.service';
import { Subject } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
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
  constructor(private modalService: BsModalService,private spinner: NgxSpinnerService, private router: Router, private service: ClassTitleService, private toastr: ToastrService, private excelService: ExcelServiceService) { }

  ngOnInit(): void {
    this.getData()        
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(true);
    this.getData();
  }


  getData() {
    this.record = [];
    this.spinner.show();
    this.service.getAllClass().subscribe((data) => {
      this.record = data;
      this.dtTrigger.next(true);
      this.spinner.hide();
    })
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
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirm(id:any): void {
    console.log(id); 
    const data = {
      'classId' : id
    }
    this.service.deleteClass(data).subscribe(res => {
      console.log("deleted");
      this.router.navigate(['/class/addClassList'])
    });
    this.toastr.error('Class Deleted Successfully!', 'Weldone!', {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true,     
    });
    this.modalRef?.hide();
  }
 
  decline(): void {
    this.modalRef?.hide();
  }
}
