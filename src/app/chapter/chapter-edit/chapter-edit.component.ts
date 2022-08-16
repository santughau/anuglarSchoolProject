import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Chapter } from '../chapter.model';
import { ChapterService } from '../chapter.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClassList } from 'src/app/classTitle/classList.model';
import { SubjectModel } from 'src/app/subject/subject.model';

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
  constructor(private spinner: NgxSpinnerService,private router: Router, private service :ChapterService,private _route: ActivatedRoute,private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.spinner.show();
    this.chapterId = this._route.snapshot.paramMap.get('id');
    this.getData();
    this.spinner.show();
    
   
    this.service.getSingleChapter(this.chapterId).subscribe((data) => {
      this.chapterModel.chapterTopicId = data.document.chapterTopicId; 
      this.chapterModel.chapterName = data.document.chapterName;     
      this.spinner.hide();
    })
  }


  getData() {
    this.spinner.show();
    this.service.getAllClass().subscribe((data) => {
      this.allClassList = data;
      this.spinner.hide();
    })
  }

  loadSubjects(ev: any) { 
    this.subjectModel.subjectId = 'select'
    const id = ev.target.value;
    this.spinner.show();
    this.service.getSubjectClassWise(id).subscribe((data) => {
      this.subjects = data.document;
      this.spinner.hide();
    })
    
  }

  updateChapter() {
    const data = {
      'chapterId':+this.chapterId,
      'chapterTopicId':this.chapterModel.chapterTopicId,
      'chapterClassId':this.classList.classId,
      'chapterSubjectId':this.subjectModel.subjectId,
      'chapterName':this.chapterModel.chapterName,
    }
    this.spinner.show();  
   
    this.service.updateChapter(data).subscribe(res => {
      if (res.status == 'success') {
        this.toastr.success('Subject Updated Successfully!', 'Weldone!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,     
        });
        this.router.navigate(['/chapter/chapterList'])
      } else {
        this.toastr.error('Subject Not  Updated Successfully!', 'Try Again!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,     
        });
     }
      
    })
  } 

}
