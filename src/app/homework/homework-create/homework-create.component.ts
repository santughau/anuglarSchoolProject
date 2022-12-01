/*
  Authors : JSWEBAPP (SANTOSH)
  Website : http://jswebapp.com/
  App Name : School Managment App With Angular 14
  This App Template Source code is licensed as per the
  terms found in the Website http://jswebapp.com/license
  Copyright and Good Faith Purchasers © 2022-present JSWEBAPP.
  Youtube : youtube.com/@jswebapp
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Homework } from '../homework.model';
import { ClassList } from 'src/app/classTitle/classList.model';
import { SubjectModel } from 'src/app/subject/subject.model';
import { Chapter } from '../../chapter/chapter.model';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
@Component({
  selector: 'app-homework-create',
  templateUrl: './homework-create.component.html',
  styleUrls: ['./homework-create.component.css']
})
export class HomeworkCreateComponent implements OnInit {
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
  myfile: any;
  homeworks : Homework = {
    homeworkId: '',
    homeworkClassId: '',
    homeworkSubjectId: '',
    homeworkChapterId: '',
    homeworkName: '',
    homeworkFile: ''
  }
  progress: number = 0;
  vaildFile: boolean = false;
  disablebtn: boolean = false;
  constructor(private router: Router, public appService: SharedServiceService,) { }

  ngOnInit(): void {
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

  fileChangeEvent(event: any) {
    this.myfile = event.target.files[0];
    console.log("myfile = " + this.myfile);
    
    const filename = this.myfile.name;
        var type = event.target.files[0].type;
    var size = event.target.files[0].size;
    var ext = filename.split('.').pop();
    console.log(ext);
    console.log(size);
    if (ext == "pdf") {
      this.vaildFile = false;
      this.disablebtn = false;
    } else {
      this.vaildFile = true;
      this.disablebtn = true;
    }   
  }


  saveHomework() {
    const data = {
      'homeworkClassId':this.classList.classId,
      'homeworkSubjectId':this.subjectModel.subjectId,
      'homeworkChapterId':this.chapterModel.chapterId,
      'homeworkName':this.homeworks.homeworkName,
      'homeworkFile':this.homeworks.homeworkFile, 
    }
    const formData = new FormData();
    formData.append('file', this.myfile);
    formData.append('homeworkClassId', this.classList.classId as string);
    formData.append('homeworkSubjectId', this.subjectModel.subjectId as string);
    formData.append('homeworkChapterId', this.chapterModel.chapterId as string);
    formData.append('homeworkName', this.homeworks.homeworkName);
    console.log(data);
    console.log(formData);
    this.appService.showSpinner();   
    this.appService.postMethod('homework/create.php',formData).subscribe((event: any) => {

      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          var eventTotal = event.total ? event.total : 0;
          this.progress = Math.round(event.loaded / eventTotal * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log('Image Upload Successfully!', event.body);
          setTimeout(() => {
            this.progress = 0;
          }, 1500);  
      }
      if (this.progress == 100) {
        this.router.navigate(['/homework/homeworkList',{id:this.chapterModel.chapterId}]);
      }
    });
    this.appService.successMsg('Homework File Uploaded Successfully!', 'Weldone!');
  }
}
