import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
 
  constructor(private modalService: BsModalService,private router: Router,private spinner: NgxSpinnerService, private toastr: ToastrService,private service: ChapterService) { }

  ngOnInit(): void {
    this.getData()
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
    this.service.getSubjectWiseChapter(id).subscribe((data) => {
      this.chapters = data.document;
      if (this.chapters.length == 0) {
        this.showTable = false;
        console.log(this.showTable);        
      } else {
        this.showTable = true;
      }
      console.log(this.chapters);
      this.spinner.hide();
      
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
    this.spinner.show();
    console.log(id); 
    const data = {
      'chapterId' : id
    }
    this.service.deleteChapter(data).subscribe(res => {
      console.log("deleted" + res);
      if (res.status == 'success') {
        this.spinner.hide();
        this.toastr.error('Subject Deleted Successfully!', 'Weldone!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,     
        });
        this.modalRef?.hide();
      } else {
        this.spinner.hide();
        this.toastr.error('Sorry Subject Was not Deleted Successfully!', 'OOPs Try Again!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,     
        });
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
