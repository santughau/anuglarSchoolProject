import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TermExamService } from '../term-exam.service';
import { Termexam } from '../termexam.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClassList } from 'src/app/classTitle/classList.model';
import { SubjectModel } from 'src/app/subject/subject.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ChapterService } from 'src/app/chapter/chapter.service';
@Component({
  selector: 'app-termexam-list',
  templateUrl: './termexam-list.component.html',
  styleUrls: ['./termexam-list.component.css']
})
export class TermexamListComponent implements OnInit {
  modalRef?: BsModalRef;
  showTermExam: boolean = false;
  showMsg: boolean = false;
  allClassList: any[] = [];
  subjects: any[] = [];
  classList: ClassList = {
    className: '',
    classId: 'select',
  }
  subjectModel: SubjectModel = {
    subjectId: 'select',
    subjectClassId: '',
    subjectClass: '',
    subjectName: '',
  }
  examNames = [
    {examid : 1 , name: 'First Unit Test'},
    {examid : 2 , name: 'Second Unit Test'},
    {examid : 3 , name: 'First Term Exam'},
    {examid : 4 , name: 'Third Unit Test'},
    {examid : 5 , name: 'Fourth Unit Test'},
    {examid : 6 , name: 'Second Term Exam'},
  ]
  exam = {
    examid:'select',
    name:'',
  }
  termExam: Termexam[] = []
  subjectId: any = '';
  termexamExamId: any = '';
  constructor(private router : Router, private termService :TermExamService,private spinner: NgxSpinnerService, private toastr: ToastrService,private modalService: BsModalService,private _route: ActivatedRoute,private service: ChapterService,) { }

  ngOnInit(): void {
    this.showMsg = false;
    this.subjectId = this._route.snapshot.paramMap.get('subjectId');
    this.termexamExamId = this._route.snapshot.paramMap.get('termexamExamId');
    console.log('subjectId' + this.subjectId + "termexamExamId" + this.termexamExamId);
    
    this.getData()
  }

  getData() {
    this.spinner.show();
    this.service.getAllClass().subscribe((data) => {
      this.allClassList = data;
      console.log(this.allClassList);
      this.spinner.hide();
    })
  }

  loadSubjects(ev: any) { 
    this.subjectModel.subjectId = 'select'
   
    //console.log(ev);
    this.subjectId = ev.target.value;
    this.spinner.show();
    this.service.getSubjectClassWise(this.subjectId).subscribe((data) => {
      this.subjects = data.document;
      //console.log(this.subjects);
      this.spinner.hide();
    })    
  }

  changeExamOrder(ev: any) {
    this.exam.examid = 'select';
    this.subjectId = ev.target.value;
  }

  loadTermExam(ev: any) {
    this.termexamExamId = ev.target.value;
    console.log(this.termexamExamId);
    console.log(this.subjectId);
    
    this.spinner.show();
    this.getExamData(this.termexamExamId,this.subjectId);
  }

  getExamData(termExamId:any,subjectId:any) {
    this.termService.getTermExam(termExamId,subjectId).subscribe((data) => {
      console.log(data);      
       this.termExam = data.document;
       console.log("lenght = " + this.termExam.length);
       if (this.termExam.length !== 0) {
         this.showTermExam = true;
         this.showMsg = false;
       } else {
         this.showMsg = true;
         this.showTermExam = false;
       }
       
      console.log(this.termExam);
      this.spinner.hide();
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.modalRef?.hide();
  }

  viewtermExam(id:any) {
    console.log(id);
    this.router.navigate(['termexam/termexamDetails', id])
  }

  editTermexam(id:any) {
    console.log(id);
    this.router.navigate(['termexam/termexamEdit', id])
  }

  confirm(id:any): void {
    console.log(id); 
    const data = {
      'termexamId' : id
    }
    this.termService.deleteTermExam(data).subscribe(res => {
      console.log("deleted");
      this.router.navigate(['/termexam/termExamList']);
      this.getExamData(this.termexamExamId,this.subjectId);
    });
    this.toastr.error('Term Exam Deleted Successfully!', 'Weldone!', {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true,     
    });
    this.modalRef?.hide();
  }

}
