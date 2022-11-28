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
import { Router } from '@angular/router';
import { ClassList } from 'src/app/classTitle/classList.model';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
import { SubjectModel } from 'src/app/subject/subject.model';
import { Chapter } from '../chapter.model';

@Component({
  selector: 'app-add-chapter',
  templateUrl: './add-chapter.component.html',
  styleUrls: ['./add-chapter.component.css']
})
export class AddChapterComponent implements OnInit {
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
  chapterModel: Chapter = {
    chapterId: '',
    chapterClassId: '',
    chapterClass: '',
    chapterSubject: '',
    chapterSubjectId: '',
    chapterName: '',
    chapterTopicId:''
  }
  constructor(private router: Router,public appService: SharedServiceService) { }

  ngOnInit(): void {
    this.getData()
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
    console.log(ev);
    const id = ev.target.value;
    this.appService.showSpinner();
    this.appService.getMethod('subjectmodel/read_By_subjectClassId.php?id=' + id).subscribe((data) => {
      this.subjects = data.document;
      console.log(this.subjects);
      this.appService.hideSpinner();
    });    
  }

  saveChapter(chapterForm:any) {
    const data = {
      'chapterTopicId':this.chapterModel.chapterTopicId,
      'chapterClassId':this.classList.classId,
      'chapterSubjectId':this.subjectModel.subjectId,
      'chapterName':this.chapterModel.chapterName,
    }
    console.log(data);
    this.appService.showSpinner();    
    chapterForm.form.reset();
    this.appService.postMethod('chapter/create.php', data,).subscribe((res) => {
      this.appService.hideSpinner();
      this.router.navigate(['/chapter/chapterList'])
    });
    this.appService.successMsg('Chapter Created Successfully!', 'Weldone !');
    
  }

}
