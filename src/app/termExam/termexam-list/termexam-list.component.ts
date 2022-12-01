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
import { ActivatedRoute, Router } from '@angular/router';
import { Termexam } from '../termexam.model';
import { ClassList } from 'src/app/classTitle/classList.model';
import { SubjectModel } from 'src/app/subject/subject.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
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
  constructor(private router : Router, private modalService: BsModalService,private _route: ActivatedRoute,public appService: SharedServiceService) { }

  ngOnInit(): void {
    this.showMsg = false;
    this.subjectId = this._route.snapshot.paramMap.get('subjectId');
    this.termexamExamId = this._route.snapshot.paramMap.get('termexamExamId');
    console.log('subjectId' + this.subjectId + "termexamExamId" + this.termexamExamId);    
    this.getData();
  }

  getData() {
    this.appService.showSpinner();
    this.appService.getMethod('classlist/read.php').subscribe((data) => {
      this.allClassList = data;
      console.log(this.allClassList);
      this.appService.hideSpinner();
    });
  }

  loadSubjects(ev: any) { 
    this.subjectModel.subjectId = 'select';   
    //console.log(ev);
    this.subjectId = ev.target.value;
    this.appService.showSpinner();
    this.appService.getMethod('subjectmodel/read_By_subjectClassId.php?id=' + this.subjectId).subscribe((data) => {
      this.subjects = data.document;
      //console.log(this.subjects);
      this.appService.hideSpinner();
    });    
  }

  changeExamOrder(ev: any) {
    this.exam.examid = 'select';
    this.subjectId = ev.target.value;
  }

  loadTermExam(ev: any) {
    this.termexamExamId = ev.target.value;
    console.log(this.termexamExamId);
    console.log(this.subjectId);    
    this.appService.showSpinner();
    this.getExamData(this.termexamExamId,this.subjectId);
  }

  getExamData(termExamId: any, subjectId: any) {
    const url = 'termexam/read.php?termexamExamId=' + termExamId + '&termexamSubjectId=' + subjectId;
    this.appService.getMethod(url).subscribe((data) => {
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
      this.appService.hideSpinner();
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.modalRef?.hide();
  }

  viewtermExam(id:any) {
    console.log(id);
    this.router.navigate(['termexam/termexamDetails', id]);
  }

  editTermexam(id:any) {
    console.log(id);
    this.router.navigate(['termexam/termexamEdit', id]);
  }

  confirm(id:any): void {
    console.log(id); 
    const data = {
      'termexamId' : id
    }
    this.appService.postMethod('termexam/delete.php',data).subscribe(res => {
      console.log("deleted");
      this.router.navigate(['/termexam/termExamList']);
      this.getExamData(this.termexamExamId,this.subjectId);
    });
    this.appService.errorsMsg('Term Exam Deleted Successfully!', 'Weldone!');
    this.modalRef?.hide();
  }
}
