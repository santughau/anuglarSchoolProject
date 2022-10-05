import {AfterViewInit, ChangeDetectorRef,TemplateRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit, AfterViewInit, OnDestroy {
  modalRef?: BsModalRef;
  showVideo: boolean = false;
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
  videos: Video[] = [];
  chapterId: any = '';
  apiLoaded = false;
  width = '100%';
  @ViewChild('demoYouTubePlayer') demoYouTubePlayer!: ElementRef<HTMLDivElement>;
  videoWidth: number | undefined;
  videoHeight: number | undefined;
  constructor(private _changeDetectorRef: ChangeDetectorRef,private router : Router, private videoService :VideoService,private spinner: NgxSpinnerService, private toastr: ToastrService,private service: ChapterService,private _route: ActivatedRoute,private Homeservice :HomeworkService,private modalService: BsModalService,) { }

  ngOnInit(): void {
    this.showMsg = false;
    this.chapterId = this._route.snapshot.paramMap.get('id');
    console.log('ss' + this.chapterId);

    if (this.chapterId !== null) {
      this.getVideoData(this.chapterId);
    }
    
    this.getData()
    if (!this.apiLoaded) {      
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
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

  loadVideos(ev: any) {
    this.chapterId = ev.target.value;
    console.log(this.chapterId);
    
    this.spinner.show();
    this.getVideoData(this.chapterId);
  }

  getVideoData(chapterId:any) {
    this.videoService.getAllVideo(chapterId).subscribe((data) => {
      console.log(data);      
       this.videos = data.document;
       console.log("lenght = " + this.videos.length);
       if (this.videos.length !== 0) {
         this.showVideo = true;
         this.showMsg = false;
       } else {
         this.showMsg = true;
         this.showVideo = false;
       }
       
      console.log(this.videos);
      this.spinner.hide();
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }


  confirm(id:any): void {
    console.log(id); 
    const data = {
      'videoId' : id
    }
    this.videoService.deleteVideo(data).subscribe(res => {
      console.log("deleted");
      this.router.navigate(['/video/videoList']);
      this.getVideoData(this.chapterId);
    });
    this.toastr.error('Video Deleted Successfully!', 'Weldone!', {
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

  editVideo(id:any) {
    console.log(id);
    this.router.navigate(['video/videoEdit', id])
  }

  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  onResize = (): void => {
    // Automatically expand the video to fit the page up to 1200px x 720px
    this.videoWidth = Math.min(this.demoYouTubePlayer.nativeElement.clientWidth, 1200);
    this.videoHeight = this.videoWidth * 0.6;
    this._changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
  }

}
