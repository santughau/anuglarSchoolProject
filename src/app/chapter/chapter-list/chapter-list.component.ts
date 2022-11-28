/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import {  Component,  OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ClassList } from 'src/app/classTitle/classList.model';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
import { SubjectModel } from 'src/app/subject/subject.model';
import { ChapterService } from '../chapter.service';
@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.css']
})
export class ChapterListComponent implements OnInit {
  showTable: boolean = false;
  modalRef?: BsModalRef;
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
 
  constructor(private modalService: BsModalService,private router: Router,private service: ChapterService,public appService: SharedServiceService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.appService.getMethod('classlist/read.php').subscribe((data) => {
      this.allClassList = data;
      console.log(this.allClassList);
      this.appService.hideSpinner();
    });
  }

  loadSubjects(ev: any) { 
    this.subjectModel.subjectId = 'select'
    console.log(ev);
    const id = ev.target.value;
    this.appService.showSpinner();
    this.appService.getMethod('subjectmodel/read_By_subjectClassId.php?id=' + id).subscribe((data) => {
      this.subjects = data.document;
      console.log(this.subjects);
      this.appService.hideSpinner();
    });    
  }

  loadChapters(ev:any) {
    console.log(ev);
    const id = ev.target.value;
    this.appService.showSpinner();
    this.appService.getMethod('chapter/read_By_subjectClassId.php?id=' + id ).subscribe((data) => {
      this.chapters = data.document;
      if (this.chapters.length == 0) {
        this.showTable = false;
        console.log(this.showTable);        
      } else {
        this.showTable = true;
      }
      console.log(this.chapters);
      this.appService.hideSpinner();
      
    })
  }

  editSubject(id:any) {
    console.log(id);
    this.router.navigate(['chapter/chapterEdit', id])
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(id: any): void {
    this.appService.showSpinner();
    console.log(id); 
    const data = {
      'chapterId' : id
    }
    this.appService.postMethod('chapter/delete.php',data).subscribe(res => {
      console.log("deleted" + res);
      if (res.status == 'success') {
        this.appService.hideSpinner();        
        this.appService.successMsg('Chapter Deleted Successfully!', 'Weldone !');
        this.modalRef?.hide();
      } else {
        this.appService.hideSpinner();        
        this.appService.errorsMsg('Sorry Chapter Was not Deleted Successfully!', 'OOPs Try Again!');
        this.modalRef?.hide();
      }
      this.modalRef?.hide();
      this.router.navigate(['/chapter/addChapter'])
    });    
  }
 
  decline(): void {
    this.modalRef?.hide();
  }

}
