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
import { Homework } from '../homework.model';
import { ClassList } from 'src/app/classTitle/classList.model';
import { SubjectModel } from 'src/app/subject/subject.model';
import { Chapter } from '../../chapter/chapter.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
@Component({
  selector: 'app-homework-list',
  templateUrl: './homework-list.component.html',
  styleUrls: ['./homework-list.component.css']
})
export class HomeworkListComponent implements OnInit {
  modalRef?: BsModalRef;
  showHomework: boolean = false;
  showMsg: boolean = false;
  allClassList: any[] = [];
  subjects: any[] = [];
  chapters: any[] = [];
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
  chapterModel: Chapter = {
    chapterId: 'select',
    chapterClassId: '',
    chapterClass: '',
    chapterSubject: '',
    chapterSubjectId: '',
    chapterName: '',
    chapterTopicId:''
  }
  homeworks: Homework[] = []
  chapterId: any = '';

  constructor(private router: Router,private modalService: BsModalService,private _route: ActivatedRoute,public appService: SharedServiceService,) { }

  ngOnInit(): void {
    this.showMsg = false;
    this.chapterId = this._route.snapshot.paramMap.get('id');
    console.log('ss' +this.chapterId);
    
    if (this.chapterId !== null) {
      this.getHomeData(this.chapterId);
    }
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
    this.subjectModel.subjectId = 'select'
    //console.log(ev);
    const id = ev.target.value;
    this.appService.showSpinner();
    this.appService.getMethod('subjectmodel/read_By_subjectClassId.php?id=' + id).subscribe((data) => {
      this.subjects = data.document;
      //console.log(this.subjects);
      this.appService.hideSpinner();
    });    
  }

  loadChapters(ev: any) {
    this.chapterModel.chapterId = 'select'
    const id = ev.target.value;
    console.log(id);
    
    this.appService.showSpinner();
    this.appService.getMethod('chapter/read_By_subjectClassId.php?id=' + id).subscribe((data) => {
      console.log(data);
      
      this.chapters = data.document;
      console.log(this.chapters);
      this.appService.hideSpinner();
    });
  }

  loadHomework(ev: any) {
    this.chapterId = ev.target.value;
    console.log(this.chapterId);
    
    this.appService.showSpinner();
    this.getHomeData(this.chapterId);
  }

  getHomeData(chapterId:any) {
    this.appService.getMethod('homework/read.php?id=' + chapterId).subscribe((data) => {
      console.log(data);      
       this.homeworks = data.document;
       console.log("lenght = " + this.homeworks.length);
       if (this.homeworks.length !== 0) {
         this.showHomework = true;
         this.showMsg = false;
       } else {
         this.showMsg = true;
         this.showHomework = false;
       }
       
      console.log(this.homeworks);
      this.appService.hideSpinner();
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(id:any): void {
    console.log(id); 
    const data = {
      'homeworkId' : id
    }
    this.appService.postMethod('homework/delete.php',data).subscribe(res => {
      console.log("deleted");
      this.router.navigate(['/homework/homeworkList']);
      this.getHomeData(this.chapterId);
    });
    this.appService.errorsMsg('Homework Deleted Successfully!', 'Weldone!');
    this.modalRef?.hide();
  }
 
  decline(): void {
    this.modalRef?.hide();
  }

  editHomework(id:any) {
    console.log(id);
    this.router.navigate(['homework/homeworkEdit', id])
  }

  viewHomework(id:any) {
    console.log(id);
    this.router.navigate(['homework/homeworkDetails', id])
  }
}
