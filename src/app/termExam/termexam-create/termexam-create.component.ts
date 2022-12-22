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
import { Termexam } from '../termexam.model';
import { ClassList } from 'src/app/classTitle/classList.model';
import { SubjectModel } from 'src/app/subject/subject.model';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { SharedServiceService } from 'src/app/shared/services/shared-service.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-termexam-create',
  templateUrl: './termexam-create.component.html',
  styleUrls: ['./termexam-create.component.css']
})
export class TermexamCreateComponent implements OnInit {
  @ViewChild('termexams') public termexams: NgForm;
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
 
  myfile: any;
  termexam: Termexam = {
    termexamId: '',
    termexamClassId: '',
    termexamSubjectId: '',
    termexamExamId: '',
    termexamName: '',
    termexamFile: ''
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
  progress: number = 0;
  vaildFile: boolean = false;
  disablebtn: boolean = false;
  constructor(private router: Router, public appService: SharedServiceService) { }

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

  saveTermExam() {    
    const formData = new FormData();
    formData.append('file', this.myfile);
    formData.append('termexamClassId', this.classList.classId as string);
    formData.append('termexamSubjectId', this.subjectModel.subjectId as string);
    formData.append('termexamExamId', this.exam.examid as string);
    formData.append('termexamName', this.termexam.termexamName);

    console.log(formData);
    this.appService.showSpinner();
    this.appService.postMethod('termexam/create.php',formData).subscribe((event: any) => {

      if (event.status == 'success') {
        this.termexams.reset();
        this.router.navigate(['/termexam/termExamList']);
        this.appService.successMsg('Homework File Uploaded Successfully!', 'Weldone!');
      }
     /*  switch (event.type) {
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
        this.router.navigate(['/termexam/termExamList',{subjectId:this.subjectModel.subjectId,termexamExamId:this.exam.examid}]);
      } */
    }); 
   
  }
}
