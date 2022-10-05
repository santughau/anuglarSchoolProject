import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from '../video.model';
import { VideoService } from '../video.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClassList } from 'src/app/classTitle/classList.model';
import { SubjectModel } from 'src/app/subject/subject.model';
import { Chapter } from '../../chapter/chapter.model';
import { ChapterService } from '../../chapter/chapter.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HomeworkService } from 'src/app/homework/homework.service';
@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.css']
})
export class VideoEditComponent implements OnInit {
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
  video: Video = {
    videoId: '',
    videoClassId: '',
    videoSubjectId: '',
    videoChapterId: '',
    videoTitle: '',
    videoLink: ''
  }
  videoId: any;
  constructor( private router : Router, private videoService :VideoService,private spinner: NgxSpinnerService, private toastr: ToastrService,private service: ChapterService,private _route: ActivatedRoute,private Homeservice :HomeworkService,) { }

  ngOnInit(): void {
    this.spinner.show();
    const id = this._route.snapshot.paramMap.get('id');
    this.videoId = id;
    this.getData();
    this.videoService.getSingleVideo(this.videoId).subscribe((data) => {
      console.log(data);
      this.video = data.document;
      this.spinner.hide();
    })
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

  updateVideo() {
    const data = {      
      'videoClassId':this.classList.classId,
      'videoSubjectId': this.subjectModel.subjectId,
      'videoChapterId':this.chapterModel.chapterId,
      'videoTitle':this.video.videoTitle,
      'videoLink':this.video.videoLink,
      'videoId':this.videoId,
    }

    this.spinner.show();  
   
    this.videoService.updateVideo(data).subscribe(res => {
      if (res.status == 'success') {
        this.toastr.success('Video Updated Successfully!', 'Weldone!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,     
        });
        this.router.navigate(['/video/videoList'])
      } else {
        this.toastr.error('Video Not  Updated Successfully!', 'Try Again!', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,     
        });
     }
      
    })
  }

}
