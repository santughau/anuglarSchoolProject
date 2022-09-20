import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Homework } from '../homework.model';
import { HomeworkService } from '../homework.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClassList } from 'src/app/classTitle/classList.model';
import { SubjectModel } from 'src/app/subject/subject.model';
import { Chapter } from '../../chapter/chapter.model';
import { ChapterService } from '../../chapter/chapter.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
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
  constructor(private router: Router,private spinner: NgxSpinnerService, private toastr: ToastrService,private service: ChapterService, private Homeservice :HomeworkService) { }

  ngOnInit(): void {
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
    const id = ev.target.value;
    this.spinner.show();
    this.service.getSubjectClassWise(id).subscribe((data) => {
      this.subjects = data.document;
      //console.log(this.subjects);
      this.spinner.hide();
    })
    
  }

  loadChapters(ev: any) {
    this.chapterModel.chapterId = 'select'
    const id = ev.target.value;
    console.log(id);
    
    this.spinner.show();
    this.Homeservice.getChapters(id).subscribe((data) => {
      console.log(data);
      
      this.chapters = data.document;
      console.log(this.chapters);
      this.spinner.hide();
    })
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
    this.spinner.show();   
    this.Homeservice.createHomework(formData).subscribe((event: any) => {

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
    this.toastr.success('Homework File Uploaded Successfully!', 'Weldone!', {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true,     
    });
    
  }

 

}
