/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Chapter } from '../chapter.model';
import { ClassList } from 'src/app/classTitle/classList.model';
import { SubjectModel } from 'src/app/subject/subject.model';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';

@Component({
  selector: 'app-chapter-edit',
  templateUrl: './chapter-edit.component.html',
  styleUrls: ['./chapter-edit.component.css']
})
export class ChapterEditComponent implements OnInit {
  allClassList: any[] = [];
  chapterId: any;
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
  chapterModel: Chapter = {
    chapterId: '',
    chapterClassId: '',
    chapterClass: '',
    chapterSubject: '',
    chapterSubjectId: '',
    chapterName: '',
    chapterTopicId:''
  }
  constructor(private router: Router, private _route: ActivatedRoute,public appService: SharedServiceService) { }

  ngOnInit(): void {
    this.appService.showSpinner();
    this.chapterId = this._route.snapshot.paramMap.get('id');
    this.getData();   
    this.appService.getMethod('chapter/read_one.php?id=' + this.chapterId).subscribe((data) => {
      console.log(data);      
      this.chapterModel.chapterTopicId = data.document.chapterTopicId; 
      this.chapterModel.chapterName = data.document.chapterName;     
      this.classList.classId = data.document.chapterClassId;           
      this.appService.hideSpinner();
    })
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

  updateChapter() {
    const data = {
      'chapterId':+this.chapterId,
      'chapterTopicId':this.chapterModel.chapterTopicId,
      'chapterClassId':this.classList.classId,
      'chapterSubjectId':this.subjectModel.subjectId,
      'chapterName':this.chapterModel.chapterName,
    }
    this.appService.showSpinner();   
    this.appService.postMethod('chapter/update.php', data).subscribe(res => {
      if (res.status == 'success') {        
        this.appService.successMsg('Chapter Updated Successfully!', 'Weldone !');
        this.router.navigate(['/chapter/chapterList'])
      } else {
        this.appService.errorsMsg('Chapter Not Updated Successfully!', 'Try Again !');
     }
      
    })
  } 

}
