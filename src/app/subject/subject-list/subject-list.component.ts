import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ExcelServiceService } from 'src/app/shared/services/excel-service.service';
import { SubjectModel } from '../subject.model';
import { SubjectService } from '../subject.service';
import { SelectRequiredValidatorDirective } from 'src/app/shared/directive/select-required-validator.directive';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit, OnDestroy, AfterViewInit {
  record: any[] = [];
  subjects: SubjectModel[] = [];
  subjectModel: SubjectModel = {
    subjectId: '',
    subjectClassId: 'select',
    subjectClass: '',
    subjectName: '',
  }
  modalRef?: BsModalRef;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject<any>();
  showTable:boolean = false
  constructor(private modalService: BsModalService,private spinner: NgxSpinnerService, private router: Router, private service: SubjectService, private toastr: ToastrService, private excelService: ExcelServiceService) { }

  ngOnInit(): void {
    this.getData();
    this.getAllSubject();
  }

 ngAfterViewInit(): void {
    this.dtTrigger.next(true);
    this.getAllSubject();   
 }
  
 exportAsXLSX(): void {
  this.excelService.exportAsExcelFile(this.subjects, 'SubjectList');
}
  
 ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}

  getData() {
    this.record = [];
    this.spinner.show();
    this.service.getAllClass().subscribe((data) => {
      this.record = data;
      //console.log(this.record);     
      this.spinner.hide();
    })
  }
  
  getAllSubject() {
    this.subjects = [];
    this.spinner.show();
    this.service.getAllSubject().subscribe((data) => {
      this.subjects = data.document;
      this.spinner.hide();
      this.showTable = true;
      this.dtTrigger.next(true);
    })
  }
  showSubject() { 
    this.showTable = false;
    this.subjects = [];
    this.spinner.show();    
    this.service.getSubjectClassWise(this.subjectModel.subjectClassId).subscribe((data) => {      
      this.subjects = data.document;
      
      if (this.subjects.length == 0) {
        this.showTable = false;
        console.log(this.showTable);        
      } else {
        this.showTable = true;
      }
      console.log(this.subjects);      
      this.spinner.hide();
      this.dtTrigger.next(true);
    })
  }

  editSubject(id:any) {
    console.log(id);
    this.router.navigate(['subject/subjectEdit', id])
  }

  

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

   
  confirm(id: any): void {
    this.spinner.show();
    console.log(id); 
    const data = {
      'subjectId' : id
    }
    this.service.deleteSubject(data).subscribe(res => {
      console.log("deleted" + res);
      if (res.status == 'success') {
        this.spinner.hide();
        this.toastr.error('Subject Deleted Successfully!', 'Weldone!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,     
        });
        this.modalRef?.hide();
      } else {
        this.spinner.hide();
        this.toastr.error('Sorry Subject Was not Deleted Successfully!', 'OOPs Try Again!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,     
        });
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



















