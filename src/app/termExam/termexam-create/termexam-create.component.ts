import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TermExamService } from '../term-exam.service';
import { Termexam } from '../termexam.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClassList } from 'src/app/classTitle/classList.model';
import { SubjectModel } from 'src/app/subject/subject.model';
import { Chapter } from '../../chapter/chapter.model';
import { ChapterService } from '../../chapter/chapter.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-termexam-create',
  templateUrl: './termexam-create.component.html',
  styleUrls: ['./termexam-create.component.css']
})
export class TermexamCreateComponent implements OnInit {
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
  constructor(private router: Router, private termService: TermExamService,private spinner: NgxSpinnerService, private toastr: ToastrService,private service: ChapterService,) { }

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
    this.spinner.show();   
    this.termService.createTermExam(formData).subscribe((event: any) => {

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
        this.router.navigate(['/termexam/termExamList',{subjectId:this.subjectModel.subjectId,termexamExamId:this.exam.examid}]);
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
