import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Homework } from '../homework.model';
import { HomeworkService } from '../homework.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClassList } from 'src/app/classTitle/classList.model';
import { SubjectModel } from 'src/app/subject/subject.model';
import { Chapter } from '../../chapter/chapter.model';
import { ChapterService } from '../../chapter/chapter.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
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

  constructor(private router: Router,private spinner: NgxSpinnerService, private toastr: ToastrService,private service: ChapterService, private Homeservice :HomeworkService,private modalService: BsModalService,private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.showMsg = false;
    this.chapterId = this._route.snapshot.paramMap.get('id');
    console.log('ss' +this.chapterId);
    
    if (this.chapterId !== null) {
      this.getHomeData(this.chapterId);
    }
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

  loadHomework(ev: any) {
    this.chapterId = ev.target.value;
    console.log(this.chapterId);
    
    this.spinner.show();
    this.getHomeData(this.chapterId);
  }

  getHomeData(chapterId:any) {
    this.Homeservice.getHomework(chapterId).subscribe((data) => {
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
      this.spinner.hide();
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
    this.Homeservice.deleteHomework(data).subscribe(res => {
      console.log("deleted");
      this.router.navigate(['/homework/homeworkList']);
      this.getHomeData(this.chapterId);
    });
    this.toastr.error('Homework Deleted Successfully!', 'Weldone!', {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true,     
    });
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
