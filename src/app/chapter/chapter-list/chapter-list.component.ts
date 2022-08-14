import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClassList } from 'src/app/classTitle/classList.model';
import { SubjectModel } from 'src/app/subject/subject.model';
import { Chapter } from '../chapter.model';
import { ChapterService } from '../chapter.service';
@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.css']
})
export class ChapterListComponent implements OnInit {
  
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
  constructor(private router: Router,private spinner: NgxSpinnerService, private toastr: ToastrService,private service: ChapterService) { }

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
    console.log(ev);
    const id = ev.target.value;
    this.spinner.show();
    this.service.getSubjectClassWise(id).subscribe((data) => {
      this.subjects = data.document;
      console.log(this.subjects);
      this.spinner.hide();
    })
    
  }

  loadChapters(ev:any) {
    console.log(ev);
    const id = ev.target.value;
    this.spinner.show();
    this.service.getSubjectClassWise(id).subscribe((data) => {
    //  this.subjects = data.document;
      console.log(this.subjects);
      this.spinner.hide();
      console.log(this.subjects);
      
    })
  }

}
